import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../shared/classes.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})



export class ClassesListComponent implements OnInit {
  ClassesList: any = [];
  constructor(public clsService: ClassesService) { }

  ngOnInit() {
    this.loadClasses();
  }
  // Issues list
  loadClasses() {
    return this.clsService.GetClasses().subscribe((data: {}) => {
      this.ClassesList = data;
    })
  }
  // Delete issue
  // deleteClasse(data) {
  //   const index = this.ClassesList.map(x => {return x.BPNAME}).indexOf(data.BPNAME);
  //   return this.clsService.deleteClasse(data.TRNNO).subscribe(res => {
  //     this.ClassesList.splice(index, 1)
  //     console.log('Blood Group deleted!')
  //    })
  // }
  deleteClass(data) {
    const index = this.ClassesList.map(x => x.CNAME).indexOf(data.CNAME);
    return this.clsService.deleteClass(data.TRNNO).subscribe(res => {
      this.ClassesList.splice(index, 1)
      console.log('Class has deleted!')
     })
  }

}
