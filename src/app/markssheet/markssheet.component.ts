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
