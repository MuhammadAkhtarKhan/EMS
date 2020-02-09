import { Component, OnInit } from '@angular/core';
import { LeaveTypeService } from '../shared/leavetype.service';

@Component({
  selector: 'app-leavetype-list',
  templateUrl: './leavetype-list.component.html',
  styleUrls: ['./leavetype-list.component.css']
})
export class LeavetypeListComponent implements OnInit {

  LeaveTypesList: any = [];
  constructor(public leavetypeService: LeaveTypeService) { }

  ngOnInit() {
    this.loadLeaveTypes();
  }
  // Issues list
  loadLeaveTypes() {
    return this.leavetypeService.GetLeaveTypes().subscribe((data: {}) => {
      this.LeaveTypesList = data;
    })
  }
  // Delete issue
  // deleteLeaveType(data) {
  //   const index = this.LeaveTypesList.map(x => {return x.BPNAME}).indexOf(data.BPNAME);
  //   return this.leavetypeService.deleteLeaveType(data.TRNNO).subscribe(res => {
  //     this.LeaveTypesList.splice(index, 1)
  //     console.log('Blood Group deleted!')
  //    })
  // }
  deleteLeaveType(data) {
    const index = this.LeaveTypesList.map(x => x.LDESC).indexOf(data.LDESC);
    return this.leavetypeService.deleteLeaveType(data.TRNNO).subscribe(res => {
      this.LeaveTypesList.splice(index, 1)
      console.log('Leave type has deleted!')
     })
  }

}