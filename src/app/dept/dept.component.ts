import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DeptService } from '../shared/dept.service';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent implements OnInit {

  deptForm: FormGroup;
  DeptArr: any = [];

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public deptService: DeptService) { }

  ngOnInit() {
    this.addDept();
  }
  addDept() {
    this.deptForm = this.fb.group({
      descrip: [''],
      abr: [''],
      status: ['']
    });
  }
  submitForm() {
    this.deptService.CreateDept(this.deptForm.value).subscribe(res => {
      console.log('Department has added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }

}
