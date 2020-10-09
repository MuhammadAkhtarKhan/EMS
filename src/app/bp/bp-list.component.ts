import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BpService } from '../shared/bp.service';
import { statusType } from '../shared/Interfaces/status';

@Component({
  selector: 'app-bp-list',
  templateUrl: './bp-list.component.html',
  styleUrls: ['./bp-list.component.css']
})
export class BpListComponent implements OnInit {
  showMsg: boolean = false;
  @Input()  BpsList: any = [];
  @Output() showMessageEvent = new EventEmitter<boolean>();
  showMessage(value: boolean) {
    this.showMessageEvent.emit(value);
  }


  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]
  constructor(public bpService: BpService) { }
  
  ngOnInit() {
   
  }
 
  deleteBp(data) {
    const index = this.BpsList.map(x => x.BPNAME).indexOf(data.BPNAME);
    return this.bpService.deleteBp(data.TRNNO).subscribe(res => {
      this.BpsList.splice(index, 1)
      console.log('Blood Group deleted!')
     // this.showMsg = true;
     this.showMessage(true);
      })
  }
  CloseAlert(){
    this.showMsg = false;
  }

}
