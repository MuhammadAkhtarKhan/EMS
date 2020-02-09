import { Component, OnInit } from '@angular/core';
import { ExamService } from '../shared/exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

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
    const index = this.ExamsList.map(x => x.BPNAME).indexOf(data.BPNAME);
    return this.exmService.deleteExam(data.TRNNO).subscribe(res => {
      this.ExamsList.splice(index, 1)
      console.log('Exam Type is deleted!')
     })
  }

}