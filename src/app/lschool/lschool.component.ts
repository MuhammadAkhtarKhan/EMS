import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClassesService } from '../shared/classes.service';

@Component({
  selector: 'app-lschool',
  templateUrl: './lschool.component.html',
  styleUrls: ['./lschool.component.css']
})
export class LschoolComponent implements OnInit {

  classList: any=[];
  LSchoolForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private classService: ClassesService
    ) { 
   this.LSchoolForm= this.fb.group({
'LDATE':[''],
'CLASS_TRNNO': []
    })
  }
 
  ngOnInit(): void {
    this.loadClasses();
  }
  OnSubmitForm(){

  }
  loadClasses(){
this.classService.GetClasses().subscribe((data)=>{
  this.classList=data;
})
  }

}
