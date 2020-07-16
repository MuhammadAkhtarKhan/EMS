import { Component, OnInit } from '@angular/core';
import { FeeTypeService } from '../shared/feetype.service';

@Component({
  selector: 'app-feetype-list',
  templateUrl: './feetype-list.component.html',
  styleUrls: ['./feetype-list.component.css']
})
export class FeetypeListComponent implements OnInit {

  FeeTypesList: any = [];
  constructor(public feetypeService: FeeTypeService) { }

  ngOnInit() {
    this.loadFeeTypes();
  }
  // Issues list
  loadFeeTypes() {
    return this.feetypeService.GetFeeTypes().subscribe((data: {}) => {
      this.FeeTypesList = data;
    })
  }
  // Delete issue
  // deleteFeeType(data) {
  //   const index = this.FeeTypesList.map(x => {return x.BPNAME}).indexOf(data.BPNAME);
  //   return this.feetypeService.deleteFeeType(data.TRNNO).subscribe(res => {
  //     this.FeeTypesList.splice(index, 1)
  //     console.log('Blood Group deleted!')
  //    })
  // }
  showMsg: boolean = false;
  deleteFeeType(data) {
    const index = this.FeeTypesList.map(x => x.FTYPE).indexOf(data.FTYPE);
    return this.feetypeService.deleteFeeType(data.TRNNO).subscribe(res => {
      this.FeeTypesList.splice(index, 1)
      console.log('Fee Type has deleted!')
      this.showMsg = true;
     })
  }

  CloseAlert(){
    this.showMsg = false;
  }

}