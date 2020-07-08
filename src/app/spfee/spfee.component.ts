import { Component, OnInit, NgZone } from '@angular/core';
import { ClassesService } from '../shared/classes.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { SpFeeService } from '../shared/spfee.service';

@Component({
  selector: 'app-spfee',
  templateUrl: './spfee.component.html',
  styleUrls: ['./spfee.component.css']
})
export class SpfeeComponent implements OnInit {
  ClassesList: any = [];
  SelectedEmpList: any=[];
  constructor(
    public classService: ClassesService,
    public spFeeService: SpFeeService,
    private ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder
  ) { }

  public spFeeForm = this.fb.group({
    TRNNO: [0],
    CLASS_TRNNO: [, [Validators.required]],
    SPDATE: [, [Validators.required]],
    'SPFEEDTLs': this.fb.array([
      this._addSpFee()
    ])
  })
  _addSpFee() {
    return this.fb.group({
      'TRNNO': [0],
      'EMP_NAME': [],
      'EMP_F_NAME': [],
      'SPFEE': [],
      'NPFEE': [],
    })
  }
  addNewSpFee() {
    const control = <FormArray>this.spFeeForm.controls['SPFEEDTLs'];
    //this._trnno = this.EmpList[this.EmpList.length - 1].TRNNO;
    //control.setValue([{ 'TRNNO': this._trnno, 'SR': this._sr + 1, 'ADDDESC': 'p-516', 'ADDTYPE': 'T' }]);
    control.patchValue([{ 'ADDTYPE': 'P' }]);
    control.insert(0,this._addSpFee());
    // console.log(this.EmpList[this.EmpList.length - 1].TRNNO);
    // console.log(this.empForm.get('EMDTLs').value);
  }
  deleteRow(index: number) {
    const control = this.spFeeForm.get('SPFEEDTLs') as FormArray;    
    control.removeAt(index);    
    console.log(control);
  }
  classSelectionChange($event){
    const cl_id = $event.value;
    console.log(cl_id);
    this.findEmpByClId(cl_id);
    const control = this.spFeeForm.get('SPFEEDTLs') as FormArray;
    control.patchValue([{ 'EMP_F_NAME':"",'SPFEE':""  }]);
  }
  findEmpByClId(cl_id: number){
    this.spFeeService.GetSpFee(cl_id).subscribe((data:{})=>{
      this.SelectedEmpList=data;

    })    
  }
  nameSelectionChange($event){
    const trn=$event.value
    console.log(trn);
    var data = this.SelectedEmpList.filter(x => x.TRNNO == trn);
    const control = this.spFeeForm.get('SPFEEDTLs') as FormArray;
    control.patchValue([{ 'EMP_F_NAME':data[0].EMP_F_NAME,'SPFEE':data[0].SPFEE  }]);
    console.log(this.spFeeForm);
    //this.spFeeForm.controls.TRNNO.patchValue(data[0].TRNNO)
  }
  ngOnInit(): void {
    this.loadClasses();
  }
  loadClasses() {
    return this.classService.GetClasses().subscribe((data: {}) => {
      this.ClassesList = data;
    })
  }
  onSubmitClassFee(){}
}
