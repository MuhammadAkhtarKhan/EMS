import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../shared/subject.service';

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.css']
})
export class SubListComponent implements OnInit {

  SubjectsList: any = [];
  constructor(public subService: SubjectService) { }

  ngOnInit() {
    this.loadSubjects();
  }
  // Issues list
  loadSubjects() {
    return this.subService.GetSubjects().subscribe((data: {}) => {
      this.SubjectsList = data;
    })
  }
  // Delete issue
  // deleteSubject(data) {
  //   const index = this.SubjectsList.map(x => {return x.BPNAME}).indexOf(data.BPNAME);
  //   return this.subService.deleteSubject(data.TRNNO).subscribe(res => {
  //     this.SubjectsList.splice(index, 1)
  //     console.log('Blood Group deleted!')
  //    })
  // }
  deleteSubject(data) {
    const index = this.SubjectsList.map(x => x.SNAME).indexOf(data.SNAME);
    return this.subService.deleteSubject(data.TRNNO).subscribe(res => {
      this.SubjectsList.splice(index, 1)
      console.log('Subject has deleted!')
     })
  }

}