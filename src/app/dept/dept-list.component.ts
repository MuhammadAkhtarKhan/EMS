import { Component, OnInit } from '@angular/core';
import { DeptService } from '../shared/dept.service';

@Component({
  selector: 'app-dept-list',
  templateUrl: './dept-list.component.html',
  styleUrls: ['./dept-list.component.css']
})
export class DeptListComponent implements OnInit {

  DeptsList: any = [];
  constructor(public dptService: DeptService) { }

  ngOnInit() {
    this.loadDepts();
  }
  // Issues list
  loadDepts() {
    return this.dptService.GetDepts().subscribe((data: {}) => {
      this.DeptsList = data;
    })
  }
  // Delete issue
  // deleteDept(data) {
  //   const index = this.DeptsList.map(x => {return x.BPNAME}).indexOf(data.BPNAME);
  //   return this.dptService.deleteDept(data.TRNNO).subscribe(res => {
  //     this.DeptsList.splice(index, 1)
  //     console.log('Blood Group deleted!')
  //    })
  // }
  deleteDept(data) {
    const index = this.DeptsList.map(x => x.DESCRIP).indexOf(data.DESCRIP);
    return this.dptService.deleteDept(data.TRNNO).subscribe(res => {
      this.DeptsList.splice(index, 1)
      console.log('Blood Group deleted!')
     })
  }

}