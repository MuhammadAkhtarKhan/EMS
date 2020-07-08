import { Component, OnInit, NgZone, Pipe, Injectable, PipeTransform } from '@angular/core';
import { GroupService } from '../shared/group.service';
import { ClassesService } from '../shared/classes.service';
import { ExamService } from '../shared/exam.service';
import { MarksService } from '../shared/marks.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { TotalmarkService } from '../shared/totalmark.service';
import * as _ from 'lodash';
import { TotalmarksdtlService } from '../shared/totamarksdtl.service';
import { SubjectService } from '../shared/subject.service';

//declare var _: any; // lodash, not strictly typed
@Pipe({
  name: 'uniqFilter',
  pure: false
})
@Injectable()
export class UniquePipe implements PipeTransform {
  transform(items: any[], args: any): any[] {
      // filter items array, items which match and return true will be kept, false will be filtered out

      return _.uniqBy(items, args);
  }
}

@Component({
  selector: 'app-totalmarks',
  templateUrl: './totalmarks.component.html',   
  styleUrls: ['./totalmarks.component.css'],
  
})
export class TotalmarksComponent implements OnInit {
  
  GroupsList: any = [];
  ClassesList: any = [];
  ExamsList: any=[];
  MarkssheetList:any=[];
  TotalmarksList: any=[];
  TotalmarksdtlSubjectList: any=[];
  cl_trnno: any;
  exam_trnno: any;
  grp_trnno: any;
  message: string;
  _mdt: any;
  show: boolean =false;
   noHidden: false;
  selected_id: any;
  _SR: number=1;
  SubjectsList: any= [];
  _scode: string='';
  mymessage: string;
  

    uniqueDates () {
    this.TotalmarksList.MDT
    .map(s => s.getTime())
    .filter((s, i, a) => a.indexOf(s) == i)
    .map(s => new Date(s));
    
   } 
  constructor(
    public groupService: GroupService,
    public classService: ClassesService,
    public examService: ExamService,
    public marksService: MarksService,
    public totalmarkService: TotalmarkService,
    public totalmarkdtlService: TotalmarksdtlService,
    public subService: SubjectService,
    private ngZone: NgZone,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }
  public totalMarksForm = this.fb.group({
    TRNNO: [''],   
    CLASS_TRNNO: ['',[Validators.required]],
    EXAM_TRNNO: ['',[Validators.required]],
    GRPMST_TRNNO: ['',[Validators.required]], 
    MDT: ['',[Validators.required]],   
  });
  //#region  Add new Marks
  MarksTotalDetailList: any=[];
   public addNewMarksForm = this.fb.group({          
       CLASS_TRNNO: ['',[Validators.required]],
       GRPMST_TRNNO: ['',[Validators.required]],
       EXAM_TRNNO: ['',[Validators.required]],
       MDT: ['',[Validators.required]],         
     'MARKTOTALDTLs': this.fb.array([
       this._addNewSubject()
     ]),
  
   });
   _addNewSubject(){
    return this.fb.group({
      'TRNNO': [],      
      'SCODE': ['', [Validators.required]],
      'TOTMARKS': ['', [Validators.required]],
    })
  }
  loadSubjects(){
    return this.subService.GetSubjects().subscribe((data: {}) => {
      this.SubjectsList = data;
    
    })
  }
  addNewSuject(){
    const control = <FormArray>this.addNewMarksForm.controls['MARKTOTALDTLs'];
    //this._trnno = this.EmpList[this.EmpList.length - 1].TRNNO;
    //control.setValue([{ 'TRNNO': this._trnno, 'SR': this._sr + 1, 'ADDDESC': 'p-516', 'ADDTYPE': 'T' }]);
    //control.patchValue([{ 'SCODE':'' }]);
    control.insert(0,this._addNewSubject());
    //console.log(this.EmpList[this.EmpList.length - 1].TRNNO);
    console.log(this.addNewMarksForm.get('MARKTOTALDTLs').value);
  }
  deleteRow(ix: number){
    const control = this.addNewMarksForm.get('MARKTOTALDTLs') as FormArray;    
    control.removeAt(ix);    
    console.log(control);
  }
  subjectSelectionChange(ix:number,$event){    
    const _sub_trnno=$event.value;    
    this.findScode(ix,_sub_trnno);
  }
  findScode(ix ,_sub_trnno){
    //const control = <FormArray>this.addNewMarksForm.controls['MARKTOTALDTLs'];
   // this.addNewMarksForm.get(`MARKTOTALDTLs.${ix}.SCODE`).setValue(this._scode);
    //<FormArray>this.addNewMarksForm.controls['MARKTOTALDTLs'].controls[ix].controls['SCODE'].setValue(ID);
   //console.log(control.at(ix));
    //console.log(control);
    const data = this.SubjectsList.filter(x => x.TRNNO==_sub_trnno);
    console.log(data[0].SCODE);
    const _scode=data[0].SCODE;
    this.addNewMarksForm.get(`MARKTOTALDTLs.${ix}.SCODE`).setValue(_scode);
    //control.patchValue([{'SCODE':_scode}],{onlySelf:true})
  }
  
  onSubmitMarks(){
    this.totalmarkService.CreateTotalMarks(this.addNewMarksForm.value).subscribe(res => {
      console.log('Your Marks added Successfully!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }
  //#endregion

  ngOnInit(): void {
    this.loadGroups();
    this.loadClasses();
    this.loadExams();
    this.loadMarksSheet();
    this.loadTotalMarks();
    this.loadSubjects();
    this.addNewMarksForm.get('MARKTOTALDTLs').valueChanges.subscribe(mkdetail => { 
      console.log('Markdetails', mkdetail);
      console.log(mkdetail[2]);
      if(mkdetail[2]==NaN){
       console.log('Nan')
      }
      this.MarksTotalDetailList=mkdetail;
      this.getSumMarks(2);
    });
  }
  //#region Add new Mark
 
  getSumMarks(index: number): number {
    let sumNewMarks = 0;
    for (let i = 0; i < this.MarksTotalDetailList.length; i++) {
      sumNewMarks += parseInt(this.MarksTotalDetailList[i].TOTMARKS, 10);
      //this.totmark_trnno = this.MarksTotalDetailList[i].MKTOTAL_TRNNO;
    }
    return sumNewMarks;
  }
  //#endregion
 
  loadMarksSheet(){
    return this.marksService.GetMarkss().subscribe((data: {}) => {     
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
  loadTotalMarks(){
    return this.totalmarkService.GetTotalMarkss().subscribe((data: {}) => {
      this.TotalmarksList = data;
    })
  }
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
      
      var data = this.TotalmarksList.filter(x => x.CLASS_TRNNO == this.cl_trnno && x.EXAM_TRNNO == this.exam_trnno && x.GRPMST_TRNNO == this.grp_trnno);
      if(data.length>0){
        console.log(data);
        this.TotalmarksList = data;
        this.message="Please select the date Now"
      }else{
        this.message="There is no such Group. Please change the group OR Create a new group"
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
      this.mymessage="Please select the fields"
    }
  }
  // get sum()
  // {
  //   let sum=0;
  //   this.TotalmarksdtlSubjectList.forEach((p,index)=>{
  //     console.log(p, index)
  //     //sum+=p[3][index]
  //   })
  //   return sum;
  // }
  totmark_trnno:number=null;
  sum: number=0;
  getSum(index: number) : number {
     this.sum = 0;
    for(let i = 0; i < this.TotalmarksdtlSubjectList.length; i++) {
      this.sum += this.TotalmarksdtlSubjectList[i].TOTMARKS;
      this.totmark_trnno=this.TotalmarksdtlSubjectList[i].MKTOTAL_TRNNO;
      
    }
    return this.sum;
  }
  deleteTotalMarksdtl(mdtl){

  }

  onSubmit() {
    //const id = this.actRoute.snapshot.paramMap.get('id');
    this.selected_id =this.TotalmarksList.find(x => x.CLASS_TRNNO == this.cl_trnno && x.EXAM_TRNNO == this.exam_trnno && x.GRPMST_TRNNO == this.grp_trnno && x.MDT == this._mdt).TRNNO;
    this.totalmarkdtlService.GetTotalMarksDtls(this.selected_id).subscribe((data: {}) => {
      this.TotalmarksdtlSubjectList = data;
      this.show =true
    })
  }
  editDetail(){
    this.router.navigate(['/totalmarkdtl/'+ this.selected_id ]);
  }

}
