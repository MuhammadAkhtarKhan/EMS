import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CastService } from '../shared/cast.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {

  cstForm: FormGroup;
  CastArr: any = [];

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public cstService: CastService) { }

  ngOnInit() {
    this.addCast();
  }
  addCast() {
    this.cstForm = this.fb.group({
      cdesc: [''],
      status: ['']
    });
  }
  submitForm() {
    this.cstService.CreateCast(this.cstForm.value).subscribe(res => {
      console.log('Cast has  added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }

}
