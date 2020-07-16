import { Component, OnInit, NgZone, Injectable } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TotalmarkService } from '../shared/totalmark.service';
import { TotalmarksdtlService } from '../shared/totamarksdtl.service';
import { SubjectService } from '../shared/subject.service';
import { GroupService } from '../shared/group.service';
import { ClassesService } from '../shared/classes.service';
import { ExamService } from '../shared/exam.service';
import { Observable } from 'rxjs';
import { TotalMarkDetailResolver } from '../shared/myTotalMarkDetailResolver';
import { TotalMarksDtlSubjects } from '../models/totalmarkdtlsubject';


@Component({
  selector: 'app-edit-totalmarks',
  templateUrl: './edit-totalmarks.component.html',
  styleUrls: ['./edit-totalmarks.component.css']
})

export class EditTotalmarksComponent implements OnInit {
 

  totalMarksForm: FormGroup;
  SubjectsList: any = [];
  TotalMarkdtlsList: any = [];
  TotalmarksList: any = [];
  TotalmarksDataList:any= [];
  TotalmarksdtlSubjectList: any = [];
  GroupsList: any = [];
  ClassesList: any = [];
  ExamsList: any = [];

  cl_trnno: any;
  exam_trnno: any;
  grp_trnno: any;
  message: string;
  _mdt: any;
  show: boolean = false;
  id: string;
  filtersLoaded: Promise<boolean>;
  constructor(
    private actRoute: ActivatedRoute,
    public tmarkdtlService: TotalmarksdtlService,
    public totalmarkService: TotalmarkService,
    public subService: SubjectService,
    public groupService: GroupService,
    public classService: ClassesService,
    public examService: ExamService,
    public tmdtlresolver: TotalMarkDetailResolver,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router, )
   {
    console.log("Cosntructor started");
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    //this.dataSource =this.tmdtlresolver.resolve(rout.paramMap.get('id'),this.setUsersFormArray);
    console.log("Cosntructor ended");
    // this.dataSource = [
    //   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    //   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    //   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    //   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    //   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    //   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    //   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    //   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    //   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    //   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    // ];
    this.tmarkdtlService.GetTotalMarksDtls(this.id).subscribe((data) => {
      this.dataSource = data;
      console.log(this.dataSource);
      if (this.dataSource != undefined) {
        this.setUsersForm();
      }
    })
    this.totalmarkService.GetTotalMarks(this.id).subscribe((marksdata) => {
      this.TotalmarksDataList = marksdata;
      console.log(this.TotalmarksDataList)
      if (this.TotalmarksDataList != undefined) {
        this.setMarksTotalForm();
      }

    })
  
  }
  setMarksTotalForm() {
    // const   ctrlValue =this.tableForm['controls'].MARKTOTALs['controls'];
    // console.log(ctrlValue);
    console.log(this.tableForm)
    // ctrlValue.CLASS_TRNNO.value=(this.TotalmarksList.CLASS_TRNNO);
    // ctrlValue.GRPMST_TRNNO.value=(this.TotalmarksList.GRPMST_TRNNO);
    // ctrlValue.EXAM_TRNNO.value=(this.TotalmarksList.EXAM_TRNNO);
    // ctrlValue.MDT.value=(this.TotalmarksList.MDT);
    // console.log(ctrlValue);
    this.tableForm.patchValue({
      TRNNO: this.TotalmarksDataList.TRNNO,
      CLASS_TRNNO: this.TotalmarksDataList.CLASS_TRNNO,
      GRPMST_TRNNO: this.TotalmarksDataList.GRPMST_TRNNO,
      EXAM_TRNNO: this.TotalmarksDataList.EXAM_TRNNO,
      MDT: this.TotalmarksDataList.MDT,
    });
    
    console.log(this.tableForm);
     
  }
  // resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
  //   console.log("loading detail started");
  //   this.tmarkdtlService.GetTotalMarksDtls(route.paramMap.get('id')).subscribe((data) => {
  //     this.dataSource = data;
  //     console.log(this.dataSource);
  //     console.log("loading detail complete");

  //   });
  // //   //throw new Error("Method not implemented.");
  //  };
  // updateTotMarkForm() {
  //   this.totalMarksForm = this.fb.group({
  //     CLASS_TRNNO: [''],
  //     GRPMST_TRNNO: [''],
  //     EXAM_TRNNO: [''],
  //     MDT: [''],
  //     SNAME: [''],
  //     SCODE: [''],
  //     TOTMARKS: ['']
  //   })
  // };
  //
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['SR', 'SNAME', 'SCODE', 'TOTMARKS'];
  dataSource;
  tableForm: FormGroup;
  // isDataAvailable:boolean = false;
  // getData(){
  //   return this.tmarkdtlService.GetTotalMarksDtls(this.id).then(event => {
  //     this.ev = event;
  //     console.log(event); // Has a value
  //     console.log(this.ev); // Has a value
  // });
  // }

  ngOnInit(): void {
    console.log("ng OnInit() started");

   // this.dataSource = this.tmdtlresolver.detail;
   
    this.loadGroups();
    this.loadClasses();
    this.loadExams();
    this.loadSubjects();
    this.tableForm = this.fb.group({    
       TRNNO:[],
        CLASS_TRNNO: [],
        GRPMST_TRNNO: [],
        EXAM_TRNNO: [],
        MDT: [],          
      'MARKTOTALDTLs': this.fb.array([])
    });
    if (this.dataSource != undefined) {
      this.setUsersForm();
    }

    this.tableForm.get('MARKTOTALDTLs').valueChanges.subscribe(users => { 
      console.log('users', users);     
      this.dataSource=users;
      this.getSum(3);
    });
   // this.tableForm.get('MARKTOTALDTLs').
    console.log("ng OnInit() ended")
  }
  private setUsersForm() {
    
    const userCtrl = this.tableForm.get('MARKTOTALDTLs') as FormArray;
    this.dataSource.forEach((user) => {
      userCtrl.push(this.setUsersFormArray(user))
    })
  };
 
  onValueUpdate($event, rowIndex){
    console.log(rowIndex);
    console.log($event);
    //
  }
  setFocusToTextBox(rowIndex){
    console.log(rowIndex);    
    document.getElementById(rowIndex).focus();
}
inputEvent($event, index){
  const id= document.getElementById(index);
   console.log(id);
   if(id != null){
    
   }   
 
  console.log($event.target.value);
}
 
  private setUsersFormArray(user) {
    
    return this.fb.group({
      MKTOTAL_TRNNO: [user.MKTOTAL_TRNNO],
      TRNNO: [user.TRNNO],
      SR: [user.SR],
      SNAME: [user.SNAME],
      SCODE: [user.SCODE],
      TOTMARKS: [user.TOTMARKS]
    });
  }
  totmark_trnno: number = null;
  sum: number = 0;
  getSum(index: number): number {
    this.sum = 0;
    for (let i = 0; i < this.dataSource.length; i++) {
      this.sum += parseInt(this.dataSource[i].TOTMARKS, 10);
      this.totmark_trnno = this.dataSource[i].MKTOTAL_TRNNO;
    }
    return this.sum;
  }

  loadExams() {
    return this.examService.GetExams().subscribe((data: {}) => {
      this.ExamsList = data;
    })
  }
  loadGroups() {
    return this.groupService.GetGroups().subscribe((data: {}) => {
      this.GroupsList = data;
    })
  }
  loadClasses() {
    return this.classService.GetClasses().subscribe((data: {}) => {
      this.ClassesList = data;
    })
  }
  loadTotalMarks() {
    return this.totalmarkService.GetTotalMarkss().subscribe((data: {}) => {
      this.TotalmarksList = data;
    })
  }

  loadSubjects() {
    return this.subService.GetSubjects().subscribe((data: {}) => {
      this.SubjectsList = data;
    })
  }
  classSelectionChange($event) {
    this.cl_trnno = $event.source.value;
    this.findDate();
  }
  examTypeSelectionChange($event) {
    this.exam_trnno = $event.source.value;
    this.findDate();
  }
  groupSelectionChange($event) {
    this.grp_trnno = $event.source.value;
    this.findDate();
  }
  dateSelectionChange($event) {
    this._mdt = $event.source.value;
  }
  findDate() {
    if (this.cl_trnno > 0 && this.exam_trnno > 0 && this.grp_trnno > 0) {

      var data = this.TotalmarksList.filter(x => x.CLASS_TRNNO == this.cl_trnno && x.EXAM_TRNNO == this.exam_trnno && x.GRPMST_TRNNO == this.grp_trnno);
      if (data.length > 0) {
        console.log(data);
        this.TotalmarksList = data;
        this.message = "Please select the date Now"
      } else {
        this.message = "There is no such Group. Please change the group OR Create a new group"
        this.loadTotalMarks();
      }

    } else if (this.cl_trnno > 0 && this.exam_trnno > 0) {
      var data = this.TotalmarksList.filter(x => x.CLASS_TRNNO == this.cl_trnno && x.EXAM_TRNNO == this.exam_trnno);
      console.log(data);

    } else if (this.cl_trnno > 0) {
      var data = this.TotalmarksList.filter(x => x.CLASS_TRNNO == this.cl_trnno);
      console.log(data);
    }
    else {
      this.message = "Please select the fields"
    }
  }
  editCell($event){
    console.log($event)
  }    
  onSubmit() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    //const id = this.TotalmarksList.find(x => x.CLASS_TRNNO == this.cl_trnno && x.EXAM_TRNNO == this.exam_trnno && x.GRPMST_TRNNO == this.grp_trnno && x.MDT == this._mdt).TRNNO;
    this.totalmarkService.UpdateTotalMarks(id,this.tableForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/marktotal'))
    })
  }

}
