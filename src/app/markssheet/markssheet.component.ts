import { Component, OnInit, NgZone } from '@angular/core';
import { GroupService } from '../shared/group.service';
import { ClassesService } from '../shared/classes.service';
import { ExamService } from '../shared/exam.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MarksService } from '../shared/marks.service';

@Component({
  selector: 'app-markssheet',
  templateUrl: './markssheet.component.html',
  styleUrls: ['./markssheet.component.css']
})
export class MarkssheetComponent implements OnInit {
  GroupsList: any = [];
  ClassesList: any = [];
  ExamsList: any=[];
  MarkssheetList:any=[];
  cl_trnno: any;
  exam_trnno: any;
  grp_trnno: any;
  private _mdt: any;
  message: string;

  constructor(
    public groupService: GroupService,
    public classService: ClassesService,
    public examService: ExamService,
    public marksService: MarksService,
    private ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder
  ) { }
  public marksForm = this.fb.group({
    TRNNO: [''],
    MDT: [''],   
    EXAM_TRNNO: [''],
    CLASS_TRNNO: [''],
    GRPMST_TRNNO: [''],
    EM_TRNNO: ['']
  })
  classSelectionChange($event){    
    this.cl_trnno=$event.source.value;    
    this.findDate();
  }
  examTypeSelectionChange($event){    
   this.exam_trnno= $event.source.value;
   this.findDate();  
  }
  groupSelectionChange($event){    
    this.grp_trnno= $event.source.value;
   this.findDate();      
  }
  dateSelectionChange($event){
    this._mdt= $event.source.value;
    this.message='';
  }
  findDate() {
    if (this.cl_trnno > 0 && this.exam_trnno > 0 && this.grp_trnno > 0) {
      
      var data = this.MarkssheetList.filter(x => x.CLASS_TRNNO == this.cl_trnno && x.EXAM_TRNNO == this.exam_trnno && x.GRPMST_TRNNO == this.grp_trnno);
      if(data.length>0){
        console.log(data);
        this.MarkssheetList = data;
        this.message="Please select the date Now"
      }else{
        this.message="There is no such Group. Please change the group OR Create a new group"
        this.loadMarksSheet();
      }
     
    } else if (this.cl_trnno > 0 && this.exam_trnno > 0) {
      var data = this.MarkssheetList.filter(x => x.CLASS_TRNNO == this.cl_trnno && x.EXAM_TRNNO == this.exam_trnno);
      console.log(data);

    } else if (this.cl_trnno > 0) {
      var data = this.MarkssheetList.filter(x => x.CLASS_TRNNO == this.cl_trnno);
      console.log(data);
    }
    else {
      this.message="Please select the fields"
    }
  }

  ngOnInit(): void {
    this.loadGroups();
    this.loadClasses();
    this.loadExams();
    this.loadMarksSheet();
  }
  loadMarksSheet(){
    return this.marksService.GetMarkss().subscribe((data: {}) => {
      debugger;
      this.MarkssheetList = data;
    })
  }
  loadExams(){
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

}
