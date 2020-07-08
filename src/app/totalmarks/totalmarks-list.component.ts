import { Component, OnInit } from '@angular/core';
import { TotalmarksdtlService } from '../shared/totamarksdtl.service';
import { SubjectService } from '../shared/subject.service';

@Component({
  selector: 'app-totalmarks-list',
  templateUrl: './totalmarks-list.component.html',
  styleUrls: ['./totalmarks-list.component.css']
})
export class TotalmarksListComponent implements OnInit {

  SubjectsList: any = [];
  TotalMarkdtlsList: any = [];

  constructor(
    public totalmarkdtlService: TotalmarksdtlService,
    public subService: SubjectService
  ) { }

  ngOnInit() {
    this.loadTotalMarkdtls();
    this.loadSubjects();
    // this.replaceCodeWithName();
  }
  replaceCodeWithName() {
    let item = this.SubjectsList[this.SubjectsList.findIndex(s => s.TRNNO === this.TotalMarkdtlsList.SUBJECT_TRNNO)] = this.TotalMarkdtlsList;
    //<!-- items[items.findIndex(el => el.id === item.id)] = item; -->
    console.log(item);
  }
  // Issues list
  loadTotalMarkdtls() {
    return this.totalmarkdtlService.GetTotalMarksDtlss().subscribe((data: {}) => {
      this.TotalMarkdtlsList = data;
    })
  }
  loadSubjects() {
    return this.subService.GetSubjects().subscribe((data: {}) => {
      this.SubjectsList = data;
    })
  }
  deleteTotalMarksdtl(data) {
    const index = this.TotalMarkdtlsList.map(x => x.BPNAME).indexOf(data.BPNAME);
    return this.totalmarkdtlService.deleteTotalMarksDtls(data.TRNNO).subscribe(res => {
      this.TotalMarkdtlsList.splice(index, 1)
      console.log('Blood Group deleted!')
    })
  }

}
