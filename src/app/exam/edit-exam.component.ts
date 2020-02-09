import { Component, OnInit } from '@angular/core';
import { ExamService } from '../shared/exam.service';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {

  ExamsList: any = [];
  constructor(public exmService: ExamService) { }

  ngOnInit() {
    this.loadExams();
  }
  // Issues list
  loadExams() {
    return this.exmService.GetExams().subscribe((data: {}) => {
      this.ExamsList = data;
    })
  }
  // Delete issue
  // deleteExam(data) {
  //   const index = this.ExamsList.map(x => {return x.BPNAME}).indexOf(data.BPNAME);
  //   return this.exmService.deleteExam(data.TRNNO).subscribe(res => {
  //     this.ExamsList.splice(index, 1)
  //     console.log('Blood Group deleted!')
  //    })
  // }
  deleteExam(data) {
    const index = this.ExamsList.map(x => x.ETYPE).indexOf(data.ETYPE);
    return this.exmService.deleteExam(data.TRNNO).subscribe(res => {
      this.ExamsList.splice(index, 1)
      console.log('Exam type has deleted!')
     })
  }

}