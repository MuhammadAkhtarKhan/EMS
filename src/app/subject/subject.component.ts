import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../shared/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subForm: FormGroup;
  SubjectArr: any = [];

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public subService: SubjectService) { }

  ngOnInit() {
    this.addSubject();
  }
  addSubject() {
    this.subForm = this.fb.group({
      sname: [''],
      scode: ['']
    });
  }
  submitForm() {
    this.subService.CreateSubject(this.subForm.value).subscribe(res => {
      console.log('Subject has added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }

}
