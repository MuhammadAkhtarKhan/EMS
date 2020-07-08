import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService } from '../shared/exam.service';
import { statusType } from '../shared/Interfaces/status';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]
  exmForm: FormGroup;
  ExamArr: any = [];

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public exmService: ExamService) { }

  ngOnInit() {
    this.addExam();
  }
  addExam() {
    this.exmForm = this.fb.group({
      etype: [''],
      status: ['A']
    });
  }
  submitForm() {
    this.exmService.CreateExam(this.exmForm.value).subscribe(res => {
      console.log('Exam Type is added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }

}
