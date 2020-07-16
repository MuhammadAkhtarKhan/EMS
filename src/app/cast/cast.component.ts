import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CastService } from '../shared/cast.service';
import { statusType } from '../shared/Interfaces/status';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {

  cstForm: FormGroup;
  CastArr: any = [];
  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public cstService: CastService) { }

  ngOnInit() {
    this.addCast();
  }
  showMsg: boolean = false;
  addCast() {
    this.cstForm = this.fb.group({
      cdesc: [''],
      status: ['A']
    });
  }
  submitForm() {
    this.cstService.CreateCast(this.cstForm.value).subscribe(res => {
      console.log('Cast has  added!')
      this.ngZone.run(() => this.router.navigateByUrl('/cast'));
      this.showMsg = true;
    });
  }

  CloseAlert(){
    this.showMsg = false;
    location.reload();
  }

}
