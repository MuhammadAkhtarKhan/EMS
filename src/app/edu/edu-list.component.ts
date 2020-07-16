import { Component, OnInit } from '@angular/core';
import { EduService } from '../shared/edu.service';

@Component({
  selector: 'app-edu-list',
  templateUrl: './edu-list.component.html',
  styleUrls: ['./edu-list.component.css']
})
export class EduListComponent implements OnInit {

  EdusList: any = [];
  constructor(public eduService: EduService) { }

  ngOnInit() {
    this.loadEdus();
  }
  // Issues list
  loadEdus() {
    return this.eduService.GetEdus().subscribe((data: {}) => {
      this.EdusList = data;
    })
  }
  // Delete issue
  // deleteEdu(data) {
  //   const index = this.EdusList.map(x => {return x.BPNAME}).indexOf(data.BPNAME);
  //   return this.eduService.deleteEdu(data.TRNNO).subscribe(res => {
  //     this.EdusList.splice(index, 1)
  //     console.log('Blood Group deleted!')
  //    })
  // }
  showMsg: boolean = false;
  deleteEdu(data) {
    const index = this.EdusList.map(x => x.DNAME).indexOf(data.DNAME);
    return this.eduService.deleteEdu(data.TRNNO).subscribe(res => {
      this.EdusList.splice(index, 1)
      console.log('Education deleted!')
      this.showMsg = true;
     })
  }

  CloseAlert(){
    this.showMsg = false;
  }

}