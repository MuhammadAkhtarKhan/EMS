import { Component, OnInit, NgZone } from '@angular/core';
import { ClassesService } from '../shared/classes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { FeeTypeService } from '../shared/feetype.service';
import { feecollectService } from '../shared/feecollect.service';

interface DiscountType{
  id:number;
  name: string;
}

@Component({
  selector: 'app-feecollect',
  templateUrl: './feecollect.component.html',
  styleUrls: ['./feecollect.component.css']
})
export class FeecollectComponent implements OnInit {

  ClassesList: any = [];
  FeetypesList:  any = [];
  DiscountTypeList: DiscountType[]=[
    {id:1, name:'Full'},
    {id:2, name:'Half'},
]
    message="Please select the fields";
  constructor(
    public classService: ClassesService,
    public feetypeService: FeeTypeService,
    private feeCollectService: feecollectService,
    private ngZone: NgZone,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  public feeCollectForm = this.fb.group({
    TRNNO: [''],   
    RDATE: ['',[Validators.required]],
    DDATE: ['',[Validators.required]],
    FMONTH: ['',[Validators.required]], 
    LDATE: ['',[Validators.required]],      
    DISCOUNT: ['',[Validators.required]], 
    DISCOUNTTYPE: ['',[Validators.required]],
    CLASS_TRNNO: ['',[Validators.required]], 
    ARRFLG: ['0',[Validators.required]],
    'FEECOLLECTDTLs':this.fb.array([
     this._addNewType()
    ])
  });
  _addNewType(){
    return this.fb.group({
      'TRNNO': [],      
      'FEETYPE_TRNNO': ['', [Validators.required]],
      'SR': [''],
      'AMT': ['', [Validators.required]],
      'FEEMON': [''],  
    })
  }
  addNewType(){
    const control = <FormArray>this.feeCollectForm.controls['FEECOLLECTDTLs'];
    //this._trnno = this.EmpList[this.EmpList.length - 1].TRNNO;
    //control.setValue([{ 'TRNNO': this._trnno, 'SR': this._sr + 1, 'ADDDESC': 'p-516', 'ADDTYPE': 'T' }]);
    //control.patchValue([{ 'SCODE':'' }]);
    control.insert(0,this._addNewType());
    //console.log(this.EmpList[this.EmpList.length - 1].TRNNO);
    console.log(this.feeCollectForm.get('FEECOLLECTDTLs').value);
  }

  ngOnInit(): void {
    this.loadClasses();
    this.loadFeeType();
  }
  loadClasses() {
    return this.classService.GetClasses().subscribe((data: {}) => {
      this.ClassesList = data;
    })
  }
  loadFeeType(){
    return this.feetypeService.GetFeeTypes().subscribe((data: {}) => {
      this.FeetypesList = data;
    })
  }
 
  feeTypeSelectionChange(ix, $event){

  }
  deleteRow(ix: number){
    const control = this.feeCollectForm.get('FEECOLLECTDTLs') as FormArray;    
    control.removeAt(ix);  
  }
  onSubmitFeeCollect(){
    console.log(this.feeCollectForm.value);
    this.feeCollectService.CreateFeeCollect(this.feeCollectForm.value).subscribe(res => {
      console.log('Voucher generated Successfully!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }
}
