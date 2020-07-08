import { Component, OnInit, NgZone } from '@angular/core';
import { ClassesService } from '../shared/classes.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClassfeeService } from '../shared/classfee.service';
import { Router } from '@angular/router';
import { ClFeedtlService } from '../shared/clfeedtl.service';

@Component({
  selector: 'app-classfee',
  templateUrl: './classfee.component.html',
  styleUrls: ['./classfee.component.css']
})
export class ClassfeeComponent implements OnInit {

  ClassesList: any = [];
  ClassFeeList: any = [];
  ClFeeDtlList: any =[];
  SelectedFeeDtlList: any= [];
  constructor(
    public classService: ClassesService,
    public classFeeService: ClassfeeService,
    public clFeedtlService: ClFeedtlService,
    private ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder
  ) { }
  public classFeeForm = this.fb.group({
    TRNNO: [0],
    CLASS_TRNNO: [, [Validators.required]],
    'CLFEEDTLs': this.fb.array([
      this._addClassFee()
    ])
  })
  _addClassFee() {
    return this.fb.group({
      'TRNNO': [0],
      'FEE': [, [Validators.required]],
      'SR': [1],
      'ADT': ['', [Validators.required]],
    })
  }
  classSelectionChange(event){
    console.log(event.value);
    console.log(this.ClassFeeList);
   const obj= this.ClassFeeList.find(e => e.CLASS_TRNNO === event.value);
   console.log(obj);
   this.classFeeForm.controls['TRNNO'].setValue(obj.TRNNO);
   const control = <FormArray>this.classFeeForm.controls['CLFEEDTLs'];
   control.patchValue([{'TRNNO':obj.TRNNO}]);
  //(<FormArray>this.classFeeForm.controls['CLFEEDTLs']).patchValue([{'TRNNO':obj.TRNNO}]);
  // console.log(this.classFeeForm.controls)  
  }
  //#region Find and update
  public classFeeFindForm = this.fb.group({
    TRNNO: [0],
    CLASS_TRNNO: [, [Validators.required]],
    'CLFEEDTLs': this.fb.array([
      this._addClassFee()
    ])
  })
  classFindSelectionChange(event){
    console.log(event.value);
    console.log(this.ClassFeeList);
   const obj1= this.ClassFeeList.find(e => e.CLASS_TRNNO === event.value);
   this.classFeeFindForm.controls['TRNNO'].setValue(obj1.TRNNO);
   //this.loadClassFeedtl(obj.TRNNO)
   //console.log(obj);
  const Obj= this.ClFeeDtlList.filter(e=> e.TRNNO==obj1.TRNNO);
  console.log(Obj);
  const newObj=Obj[Obj.length-1];
   const ctrl = <FormArray>this.classFeeFindForm.controls['CLFEEDTLs'];   
   ctrl.patchValue([{'TRNNO':newObj.TRNNO, 'FEE':newObj.FEE, 'SR':newObj.SR,'ADT': newObj.ADT }]);
  }
  loadClassFeedtl(id: number){
return this.clFeedtlService.GetClassFeedtl(id).subscribe((data: {})=>{
  this.SelectedFeeDtlList=data;
})
  }
  //#region 

  ngOnInit(): void {
    this.loadClasses();
    this.loadClassFeeData();
    this.loadClFeedtl();
  }
  loadClFeedtl(){
    return this.clFeedtlService.GetClassFeedtls().subscribe((data: {}) => {
      this.ClFeeDtlList = data;
    })
  }
  loadClasses() {
    return this.classService.GetClasses().subscribe((data: {}) => {
      this.ClassesList = data;
    })
  }
  loadClassFeeData(){
    return this.classFeeService.GetClassFees().subscribe((data: {}) => {
      this.ClassFeeList = data;
    })
  }
  onSubmitClassFee() {
    this.classFeeService.CreateClassFee(this.classFeeForm.value).subscribe(res => {
      console.log('Fees added Successfully!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }
  onUpdateClassFee(){
    
  }

}
