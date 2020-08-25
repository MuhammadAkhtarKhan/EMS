import { Component, OnInit, NgZone } from '@angular/core';
import { GroupService } from '../shared/group.service';
import { ClassesService } from '../shared/classes.service';
import { ExamService } from '../shared/exam.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MarksService } from '../shared/marks.service';
import { TeacherService } from '../shared/teacher.service';
import { StudentService } from '../shared/student.service';
import { TotalmarkService } from '../shared/totalmark.service';
import { TotalmarksdtlService } from '../shared/totamarksdtl.service';
declare var $: any;

@Component({
  selector: 'app-markssheet',
  templateUrl: './markssheet.component.html',
  styleUrls: ['./markssheet.component.css']
})
export class MarkssheetComponent implements OnInit {
  GroupsList: any = [];
  ClassesList: any = [];
  ExamsList: any = [];
  MarkssheetList: any = [];
  cl_trnno: any;
  exam_trnno: any;
  grp_trnno: any;
  private _mdt: any;
  message: string;
  TeacherList: any = [];
  currentClStudentList: any = [];
  show: boolean = false;
  selected_id: any;
  TotalmarksList: any = [];
  TotalmarksdtlSubjectList: any = [];
  showMarks: boolean = false;
  _sr: number = 1;
  _empName: any;
  showDetail: boolean = false;
  _index:number;
  tracked_sr: number;
  constructor(
    public groupService: GroupService,
    public classService: ClassesService,
    public examService: ExamService,
    public marksService: MarksService,
    public teacherService: TeacherService,
    public studentService: StudentService,
    private totalmarkService: TotalmarkService,
    private totalmarkdtlService: TotalmarksdtlService,
    private ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (this.currentClStudentList != undefined) {
      this.setMarksForm();
    }
    const userCtrl = this.marksForm.get('MARKSDTLs') as FormArray;
    console.log(userCtrl);
    if (userCtrl.controls.length > 1) {
      this.showDetail = true;
    }

  }
  public marksForm = this.fb.group({
    TRNNO: [0],
    MDT: ['', [Validators.required]],
    EXAM_TRNNO: ['', [Validators.required]],
    CLASS_TRNNO: ['', [Validators.required]],
    GRPMST_TRNNO: ['', [Validators.required]],
    EM_TRNNO: ['', [Validators.required]],
    MARKSDTLs: this.fb.array([])      
   
    // MARKSDTL1: this.fb.array([])

  })
  public setMarksForm() {
    const userCtrl = this.marksForm.get('MARKSDTLs') as FormArray;
    console.log(userCtrl);
    this.currentClStudentList.forEach((student) => {
      userCtrl.push(this.setMarksFormArray(student))
    })
  }
  private setMarksDtlForm(sr: number,index: number, totalMark_trnno,ctrl) {
    //const userCtrl = this.marksForm.get('MARKSDTLs').get('MARKSDTL1') as FormArray;
    //const userCtrl = (<FormArray>this.marksForm.controls['MARKSDTLs']).at(index).get('MARKSDTL1') as FormArray;
    console.log(ctrl);
    //ctrl as FormArray
    this.TotalmarksdtlSubjectList.forEach((student) => {
      ctrl.push(this.setMarksDtlFormArray(student, sr, totalMark_trnno))
    })
  }
  private setMarksFormArray(student) {
    return this.fb.group({
      TRNNO: [0],
      SR: [this._sr++],
      EM_TRNNO: [student.TRNNO],
      EMP_NAME: [student.EMP_NAME],
      EMP_F_NAME: [student.EMP_F_NAME],
      EMP_ID: [student.EMP_ID],
      MARKSDTL1: this.fb.array([])
    });
  }
  private setMarksDtlFormArray(student, sr, totMark_trnno) {
    return this.fb.group({
      TRNNO: [0],
      SR: [sr],
      SR1: [student.SR],
      SNAME: [student.SNAME],
      SCODE: [student.SCODE],
      TOTMARKS: [student.TOTMARKS],
      GMARKS: [, [Validators.required]],
      MARKTOTALDTL_TRNNO: [totMark_trnno],
      MARKTOTALDTL_SR: [student.SR]
    });
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
    this.message = '';
  }
  findDate() {
    if (this.cl_trnno > 0 && this.exam_trnno > 0 && this.grp_trnno > 0) {

      var data = this.TotalmarksList.filter(x => x.CLASS_TRNNO == this.cl_trnno && x.EXAM_TRNNO == this.exam_trnno && x.GRPMST_TRNNO == this.grp_trnno);
      if (data.length > 0) {
        console.log(data);
        this.MarkssheetList = data;
        this.message = "Please select the date Now"
      } else {
        this.message = "There is no such Group. Please change the group OR Create a new group"
        this.loadMarksSheet();
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


  ngOnInit(): void {
    this.loadGroups();
    this.loadClasses();
    this.loadExams();
    this.loadMarksSheet();
    this.loadTeachers();
    this.loadTotalMarks();
  }
  loadMarksSheet() {
    return this.marksService.GetMarkss().subscribe((data: {}) => {
      this.MarkssheetList = data;
    })
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
  loadTeachers() {
    return this.teacherService.GetAllTeachers().subscribe((data: {}) => {
      this.TeacherList = data;
    })
  }
  loadTotalMarks() {
    return this.totalmarkService.GetTotalMarkss().subscribe((data: {}) => {
      this.TotalmarksList = data;
    })
  }
  editMarks(control,index: number) {
    // const userCtrl = this.marksForm.get('MARKSDTL1') as FormArray;
    // for(let i = userCtrl.length-1; i >= 0; i--) {
    //   userCtrl.removeAt(i)
    //       }
    this._index=index;
    console.log(control);
    
    console.log(index);
    $(index).hide();

    this._empName = this.currentClStudentList[index].EMP_NAME
    const sr = index + 1
    this.selected_id = this.TotalmarksList.find(x => x.CLASS_TRNNO == this.cl_trnno && x.EXAM_TRNNO == this.exam_trnno && x.GRPMST_TRNNO == this.grp_trnno && x.MDT == this._mdt).TRNNO;
    this.totalmarkdtlService.GetTotalMarksDtls(this.selected_id).subscribe((data: {}) => {
      this.TotalmarksdtlSubjectList = data;
      console.log(this.marksForm)
      debugger;
      if(this.tracked_sr!=sr){
        this.setMarksDtlForm(sr,index, this.selected_id,control);        
      }
      
    })
    this.showMarks = true;
  }
 

  onPopulate() {
   
    if (this.currentClStudentList.length == 0) {
     const contr= this.marksForm.get('MARKSDTLs');
      console.log(contr);
      this.studentService.CreateStudent(this.marksForm.value).subscribe((data: {}) => {
        this.currentClStudentList = data;
        if (data != null) {
          this.setMarksForm()
          this.showDetail = true;
        }
        this.selected_id = this.TotalmarksList.find(x => x.CLASS_TRNNO == this.cl_trnno && x.EXAM_TRNNO == this.exam_trnno && x.GRPMST_TRNNO == this.grp_trnno && x.MDT == this._mdt).TRNNO;
        this.totalmarkdtlService.GetTotalMarksDtls(this.selected_id).subscribe((data: {}) => {
          this.TotalmarksdtlSubjectList = data;
          this.show = true
        })
        console.log(this.marksForm.value)
        this.show = true
      })
    }
  }
  OnSubmitForm() {
    this.marksService.CreateMarks(this.marksForm.value).subscribe((data: {}) => {
      const userCtrl = this.marksForm.get('MARKSDTL1') as FormArray;
      for (let i = userCtrl.length - 1; i >= 0; i--) {
        userCtrl.removeAt(i)
      }
    })
  }

}
