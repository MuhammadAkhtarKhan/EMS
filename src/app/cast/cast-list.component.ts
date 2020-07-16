import { Component, OnInit } from '@angular/core';
import { CastService } from '../shared/cast.service';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.css']
})

export class CastListComponent implements OnInit {
  CastsList: any = [];
  constructor(public bpService: CastService) { }

  ngOnInit() {
    this.loadCasts();
  }
  showMsg: boolean = false;
  // Issues list
  loadCasts() {
    return this.bpService.GetCasts().subscribe((data: {}) => {
      this.CastsList = data;
    })
  }
  // Delete issue
  // deleteCast(data) {
  //   const index = this.CastsList.map(x => {return x.BPNAME}).indexOf(data.BPNAME);
  //   return this.bpService.deleteCast(data.TRNNO).subscribe(res => {
  //     this.CastsList.splice(index, 1)
  //     console.log('Blood Group deleted!')
  //    })
  // }
  deleteCast(data) {
    const index = this.CastsList.map(x => x.CDESC).indexOf(data.CDESC);
    return this.bpService.deleteCast(data.TRNNO).subscribe(res => {
      this.CastsList.splice(index, 1)
      console.log('Cast has deleted!')
      this.showMsg = true;
     })
  }

  CloseAlert(){
    this.showMsg = false;
  }

}

