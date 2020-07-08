import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveTypeService } from '../shared/leavetype.service';

@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.css']
})
export class LeavetypeComponent implements OnInit {

  leavetypeForm: FormGroup;
  LeaveTypeArr: any = [];

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public leavetypeService: LeaveTypeService) { }

  ngOnInit() {
    this.addLeaveType();
  }
  addLeaveType() {
    this.leavetypeForm = this.fb.group({
      LDESC: [''],
      LABRV: [''],
      LWEIGHT: [''],
      STATUS: ['A']
    });
  }
  submitForm() {
    this.leavetypeService.CreateLeaveType(this.leavetypeForm.value).subscribe(res => {
      // tslint:disable-next-line: semicolon
      console.log('Leave type has added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }

}

