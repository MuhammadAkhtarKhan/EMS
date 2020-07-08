import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { GroupService } from '../shared/group.service';
import { IEmployee } from '../shared/Interfaces/employee';
import { EmService } from '../shared/em.service';
import { MatDialog } from '@angular/material/dialog';
import {GroupChangeService} from '../shared/grpchange.service'
import { LSchoolService } from '../shared/lschool.service';


@Component({
  selector: 'app-groupchange',
  templateUrl: './groupchange.component.html',
  styleUrls: ['./groupchange.component.css']
})
export class GroupchangeComponent implements OnInit {
  GroupsList: any=[];
  LSchooldtlList: any=[];
  Filtered_employeesList: any=[];
  //
  
@Input()
// public contacts:  IContact[] ;
public employees:any=  [] ;
public filtered_data: any=[];
public newarray1:any=[];
//public currentContact: IContact;
public currentEmployee: IEmployee;
searchModel: any;

@Output() public select: EventEmitter<{}> = new EventEmitter();

public onSelect(employee): void {
  console.log(employee);
  console.log(this.groupChangeForm.controls)
  this.groupChangeForm.patchValue({
    'EMP_NAME':employee.EMP_NAME,
    'EMP_F_NAME': employee.EMP_F_NAME,
    'EMP_ID': employee.EMP_ID,
    'FGRPMST_TRNNO': employee.GRPMST_TRNNO,
    'EM_TRNNO': employee.TRNNO
  })
  this.currentEmployee = employee; 
  this.select.emit(employee);
}
  constructor(
    public groupService: GroupService,
    public groupChangeService: GroupChangeService,
    public lschoolService: LSchoolService,
    public empService: EmService,
    private ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
   }
  public groupChangeForm = this.fb.group({
    SearchEm:'',
    EMP_NAME: ['', [Validators.required]],
    EMP_F_NAME: ['', [Validators.required]],
    EMP_ID: ['', [Validators.required]],
    FGRPMST_TRNNO: ['', [Validators.required]],
    CHDATE: ['', [Validators.required]],
    GRPMST_TRNNO: ['', [Validators.required]],
    EM_TRNNO: ['', [Validators.required]],
  });
  fun_compareLists(){
    console.log(this.employees) 
    console.log(this.LSchooldtlList);   
   
  }
  onInputClick(){
    console.log("I am clicked")    
    this.remove_duplicates(this.employees, this.LSchooldtlList);   
  }
  remove_duplicates(a, b){
    var onlyInA = a.filter(comparer(b));
   // var onlyInB = b.filter(comparer(a));

   function comparer(otherArray){    
      return function(current){
        return otherArray.filter(function(other){
          return other.EM_TRNNO == current.TRNNO 
        }).length == 0;
      }
    } 
    this.filtered_data=onlyInA;
    console.log(this.filtered_data)
    //console.log(onlyInA);
  }
   
  ngOnInit(): void {
    this.loadLschooldtl();
    this.loadEmployees();
    console.log(this.employees)
    console.log(this.LSchooldtlList)
     //this.newarray1 = this.employees.filter(val => !this.LSchooldtlList.includes(val));
   // console.log(this.newarray1)
    this.loadGroups();
    // this.loadEmployees();
    // this.loadLschooldtl();
    this.groupChangeForm.valueChanges.subscribe(form_val => {
      const SearchEm = form_val.SearchEm;
      if(SearchEm && SearchEm.trim().length){
        this.filtered_data = this.filtered_data.filter( (newarray1) => newarray1.EMP_NAME.match(new RegExp(`${SearchEm}`, 'gi')) );
      } else {
        this.filtered_data  = this.employees;
      }
      // use SearchEm to filter the boxes, somehow ...

    });  
    console.log('ng On init end... ')
  }
  loadGroups() {
    this.groupService.GetGroups().subscribe((data: {}) => {
      this.GroupsList = data;
    })
  }
  loadLschooldtl() {
    this.lschoolService.GetLSchoolsDtl().subscribe((data: {}) => {
      this.LSchooldtlList = data;
      //this.fun_compareLists();
    })
  }
  loadEmployees() {
    this.empService.GetEms().subscribe((data: {}) => {
      this.employees = data;
      this.fun_compareLists();
    })
  }
  onSubmitGroupChange(){
    this.groupChangeService.CreateGroupChange(this.groupChangeForm.value).subscribe(res => {
      console.log('Group  has changed successfully!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }
}
