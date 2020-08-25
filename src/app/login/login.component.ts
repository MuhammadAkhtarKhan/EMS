import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { LoggedinUser } from '../shared/Interfaces/loggedinuser';
import { AppResponse } from '../shared/Interfaces/appResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;
  isSubmitted = false;
  error: string;

  constructor(private frmBuilder: FormBuilder,
    private authService: AuthService,      
    private router: Router) { }

  ngOnInit() {
    this.frmLogin = this.frmBuilder.group({
      userName: ['', Validators.required ],
      password: ['', Validators.required ]
    })
  }

  get frm() { return this.frmLogin.controls; }

  login() {
    this.isSubmitted = true;
    this.error = null;
    if (!this.frmLogin.valid) return;

    this.authService.login(this.frmLogin.value)    
      .subscribe((data: LoggedinUser) => {
          this.authService.manageSession(data);
          this.authService.loginStatus.emit(true);
          if (this.authService.redirectUrl) {
            this.router.navigate([this.authService.redirectUrl]);
          } else {
            this.router.navigate(['/dashboard']);
          }        
        },   (error: AppResponse) => {
             if(error.status === 400)
                   this.error = "Either user name or password is incorrect!";
              else
                   this.error = error.message;
       });
  }

  focused() { this.error = ''; }

}
