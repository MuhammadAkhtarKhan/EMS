import { Component, OnInit } from '@angular/core';
import { BpService } from '../shared/bp.service';
import { statusType } from '../shared/Interfaces/status';


@Component({
  selector: 'app-bp-list',
  templateUrl: './bp-list.component.html',
  styleUrls: ['./bp-list.component.css']
})
export class BpListComponent implements OnInit {
  BpsList: any = [];
  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]
  constructor(public bpService: BpService) { }

  ngOnInit() {
    this.loadBps();
  }
  // Issues list
  loadBps() {
    return this.bpService.GetBps().subscribe((data: {}) => {
      this.BpsList = data;
    })
  }
  // Delete issue
  // deleteBp(data) {
  //   const index = this.BpsList.map(x => {return x.BPNAME}).indexOf(data.BPNAME);
  //   return this.bpService.deleteBp(data.TRNNO).subscribe(res => {
  //     this.BpsList.splice(index, 1)
  //     console.log('Blood Group deleted!')
  //    })
  // }
  deleteBp(data) {
    const index = this.BpsList.map(x => x.BPNAME).indexOf(data.BPNAME);
    return this.bpService.deleteBp(data.TRNNO).subscribe(res => {
      this.BpsList.splice(index, 1)
      console.log('Blood Group deleted!')
     })
  }

}
