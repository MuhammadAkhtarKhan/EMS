import { Component, OnInit, NgZone } from '@angular/core';
import { ExamService } from '../shared/exam.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { statusType } from '../shared/Interfaces/status';


@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {
  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]
  ExamsList: any = [];
  updateExamForm: FormGroup;
  constructor(
    private actRoute: ActivatedRoute,
    public examService: ExamService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.examService.GetExam(id).subscribe((data) => {
      this.updateExamForm = this.fb.group({
        ETYPE: [data.ETYPE],
        STATUS: [data.STATUS],
        TRNNO:[data.TRNNO]
      })
    })
   }

  ngOnInit() {
this.updateForm();
  }
  updateForm(){
    this.updateExamForm = this.fb.group({
      ETYPE: [''],
      STATUS: [''],
      TRNNO: ['']
    })
  }
  showMsg: boolean = false;
  submitForm() {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.examService.UpdateExam(id, this.updateExamForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/exam/id'))
      this.showMsg = true;
    })
  }

  CloseAlert(){
    this.showMsg = false;
    this.ngZone.run(() => this.router.navigateByUrl('/exam'))
  }

}