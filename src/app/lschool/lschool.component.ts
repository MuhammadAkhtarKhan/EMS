import { Component, OnInit, NgZone, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClassesService } from '../shared/classes.service';
import { GroupService } from '../shared/group.service';
import { StudentService } from '../shared/student.service';
import { Router } from '@angular/router';
import { LSchoolService } from '../shared/lschool.service';

@Component({
  selector: 'app-lschool',
  templateUrl: './lschool.component.html',
  styleUrls: ['./lschool.component.css']
})
export class LschoolComponent implements OnInit {

  classList: any = [];
  LSchoolForm: FormGroup;
  groupsList: any = [];
  currentClStudentList: any = [];
  show: boolean =false;
  dataSource: any;
  disabledButton: boolean = false;
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private classService: ClassesService,
    private groupService: GroupService,
    private studentService: StudentService,
    private lschoolService: LSchoolService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.LSchoolForm = this.fb.group({
      'LDATE': ['', [Validators.required]],
      'CLASS_TRNNO': ['', [Validators.required]],
      'GRPMST_TRNNO': ['0.0', []],
      'LSCHOOLDTLs': this.fb.array([])
    })

    if (this.currentClStudentList != undefined) {
      this.setUsersForm();
    }
  }
  private setUsersForm() {    
    const userCtrl = this.LSchoolForm.get('LSCHOOLDTLs') as FormArray;
    this.currentClStudentList.forEach((student) => {
      userCtrl.push(this.setUsersFormArray(student))
    })
  }
  private setUsersFormArray(student) {    
    return this.fb.group({
      EM_TRNNO: [student.TRNNO],
      EMP_NAME: [student.EMP_NAME],
      EMP_F_NAME: [student.EMP_F_NAME],
      EMP_ID: [student.EMP_ID], 
      isLeft: [false]    
    });
  }
  

  ngOnInit(): void {
    this.loadClasses();
    this.loadGroups();
  }
  
  changeCheck(){
    let flag= true;
    this.checkboxes.forEach((element) => { // loop all checkboxes to find checked boxes
     if(element.nativeElement.checked){
       flag=false // if atleast one checkbox checked, put the flag flase
     }
   });

   this.disabledButton = flag;
  }
  classSelectionChange($event){
console.log($event.value);
//this.currentClStudentList=[];
const userCtrl = this.LSchoolForm.get('LSCHOOLDTLs') as FormArray;
for(let i = userCtrl.length-1; i >= 0; i--) {
  userCtrl.removeAt(i)
//userCtrl.controls=[];
  }
}
  groupSelectionChange($event){
    console.log($event);
    const userCtrl = this.LSchoolForm.get('LSCHOOLDTLs') as FormArray;
for(let i = userCtrl.length-1; i >= 0; i--) {
  userCtrl.removeAt(i)
      }
    }

  loadGroups() {
    this.groupService.GetGroups().subscribe((data) => {
      this.groupsList = data;
    })
  }
  loadClasses() {
    this.classService.GetClasses().subscribe((data) => {
      this.classList = data;
    })
  }
 
  OnSubmitForm() {
    this.studentService.CreateStudent(this.LSchoolForm.value).subscribe((data: {}) => {
      this.currentClStudentList = data;
      if(data!=null){
        this.setUsersForm()
      }
      console.log(this.LSchoolForm.value)
      this.show =true
    })
  }
  onSave(){
    this.lschoolService.CreateLSchool(this.LSchoolForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/lschool'))
    })

  }

}
