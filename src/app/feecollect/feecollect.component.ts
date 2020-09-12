import { Component, OnInit, NgZone } from '@angular/core';
import { ClassesService } from '../shared/classes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { FeeTypeService } from '../shared/feetype.service';
import { feecollectService } from '../shared/feecollect.service';
import { StudentService } from '../shared/student.service';

interface DiscountType {
  id: number;
  name: string;
}

@Component({
  selector: 'app-feecollect',
  templateUrl: './feecollect.component.html',
  styleUrls: ['./feecollect.component.css']
})
export class FeecollectComponent implements OnInit {
  ClassesList: any = [];
  FeetypesList: any = [];
  DiscountTypeList: DiscountType[] = [
    { id: 1, name: 'Full' },
    { id: 2, name: 'Half' },
  ]
  message = "Please select the fields";
  StudentsList: any = [];
  constructor(
    public classService: ClassesService,
    public feetypeService: FeeTypeService,
    private feeCollectService: feecollectService,
    private studentService: StudentService,
    private ngZone: NgZone,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  public feeCollectForm = this.fb.group({
    TRNNO: [0],
    RDATE: ['', [Validators.required]],
    EM_TRNNO: ['', [Validators.required]],
    EMP_F_NAME: ['', [Validators.required]],
    EMP_ID: ['', [Validators.required]],
    DDATE: ['', [Validators.required]],
    FMONTH: [1, [Validators.required, Validators.minLength(1)]],
    LDATE: ['', [Validators.required]],
    DISCOUNT: ['', []],
    DISCOUNTTYPE: ['', []],
    CLASS_TRNNO: ['', [Validators.required]],
    ARRFLG: ['1', [Validators.required]],
    FEE: ['', [Validators.required]],
    FSTATUS:['U'],
    'FEECOLLECTDTLs': this.fb.array([
      this._addNewType()
    ])
  });
  _addNewType() {
    return this.fb.group({
      'TRNNO': [0],
      'FEETYPE_TRNNO': ['', [Validators.required]],
      'SR': [1],
      'AMT': ['', [Validators.required]],
      'FEEMON': [''],
      'TOTAMOUNT': ['0'],
    })
  }
  addNewType() {
    const control = <FormArray>this.feeCollectForm.controls['FEECOLLECTDTLs'];
    let _length = control.length;
    control.insert(_length, this._addNewType());    
    console.log(this.feeCollectForm.get('FEECOLLECTDTLs').value);
    let month = this.feeCollectForm.value.FMONTH;
    const arr= this.feeCollectForm.get("FEECOLLECTDTLs") as FormArray;
    arr.at(_length)["controls"]["FEEMON"].patchValue(month);
    arr.at(_length)["controls"]["SR"].patchValue(_length+1);
  }

  nameSelectionChange($event) {
    let id = $event.value;
    this.findCurrentClassByEmpId(id);
    let selectStudent = this.StudentsList.find(i => i.TRNNO == id);
    this.feeCollectForm.patchValue({ 'EMP_F_NAME': selectStudent.EMP_F_NAME, 'EMP_ID': selectStudent.EMP_ID });

  }
  findCurrentClassByEmpId(id: number) {
    return this.studentService.GetStudentClassByEmpId(id).subscribe((data: number) => {
      this.feeCollectForm.patchValue({ 'CLASS_TRNNO': data })
      this.findStudentCurrentFee();
    })
  }
  findStudentCurrentFee() {
    this.feeCollectService.GetCurrentFee(this.feeCollectForm.value).subscribe((data: number) => {
      this.feeCollectForm.patchValue({ 'FEE': data })
      const control = <FormArray>this.feeCollectForm.controls['FEECOLLECTDTLs'];
      let month = this.feeCollectForm.value.FMONTH;
      let totamout = month * data;
      control.patchValue([{ 'AMT': data, 'FEETYPE_TRNNO': 1, 'TOTAMOUNT': totamout, 'FEEMON': month }])
    })
  }
  onMonthChange(month: number) {
    console.log(month);
    console.log(this.feeCollectForm.value)
    let fee = this.feeCollectForm.value.FEE;
    let totamout = fee * month;
    console.log(totamout);
    const control = <FormArray>this.feeCollectForm.controls['FEECOLLECTDTLs'];    
    control.patchValue([{ 'TOTAMOUNT': totamout, 'FEEMON': month }])
    for (let i = control.length - 1; i >= 0; i--) {     
      control.at(i)["controls"]["FEEMON"].patchValue(month);
    }    
  }
  onAmountChange(control, index: number) {
    console.log(control);    
    console.log(index);
    const ctrl = <FormArray>this.feeCollectForm.controls['FEECOLLECTDTLs'];
    let amt=control.value.AMT;
   ctrl.at(index)["controls"]["TOTAMOUNT"].patchValue(amt);  
  }
  getTotamout(): number {
    let sumTotamout = 0;
    const ctrl = <FormArray>this.feeCollectForm.controls['FEECOLLECTDTLs'];   
    for (let i = 0; i < ctrl.length; i++) {
      sumTotamout += parseInt(ctrl.value[i].TOTAMOUNT, 10);
    }
    return sumTotamout;
  }
  onTotAmountChange(){
    this.getTotamout();
  }

  ngOnInit(): void {
    this.loadClasses();
    this.loadFeeType();
    this.loadCurrentStudents();
  }

  loadClasses() {
    return this.classService.GetClasses().subscribe((data: {}) => {
      this.ClassesList = data;
    })
  }
  loadFeeType() {
    return this.feetypeService.GetFeeTypes().subscribe((data: {}) => {
      this.FeetypesList = data;
    })
  }
  loadCurrentStudents() {
    return this.studentService.GetAllStudents().subscribe((data: {}) => {
      this.StudentsList = data;
    })
  }

  feeTypeSelectionChange(ix, $event) {

  }
  deleteRow(ix: number) {
    const control = this.feeCollectForm.get('FEECOLLECTDTLs') as FormArray;
    control.removeAt(ix);
  }
  onSubmitFeeCollect() {
    console.log(this.feeCollectForm.value);
    this.feeCollectService.CreateFeeCollect(this.feeCollectForm.value).subscribe(res => {
      console.log('Voucher generated Successfully!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }
}
