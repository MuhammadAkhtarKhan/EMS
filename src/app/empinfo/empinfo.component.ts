import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { CastService } from '../shared/cast.service';
import { BpService } from '../shared/bp.service';
import { GroupService } from '../shared/group.service';
import { ClassesService } from '../shared/classes.service';
import { SecdtlService } from '../shared/secdtl.service';
import { EmService } from '../shared/em.service';
import { EduService } from '../shared/edu.service';
import { Router } from '@angular/router';


interface Sex {
  id: number;
  name: string;
}

interface STypes {
  id: number;
  name: string;
  abr:string;
}

interface AddType {
  id: number;
  name: string;
  type: string;
}
interface PhoneType{
  id: number;
  name: string;
  type: string;
}
interface RelationType{
  id: number;
  name: string; 
}

@Component({
  selector: 'app-empinfo',
  templateUrl: './empinfo.component.html',
  styleUrls: ['./empinfo.component.css']
})
export class EmpinfoComponent implements OnInit {

  // bpControl = new FormControl('', Validators.required);
  //groupControl = new FormControl('', Validators.required);
  // castControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  sexControl = new FormControl('', Validators.required);
  public _trnno: number = 0;
  public _sr: number = 1;
   i: number=0;
  EmpList: any = [];
  phoneTypeList: PhoneType[]=[
    {id:1, name:'Mobile', type: 'M'},
    {id:2, name:'Landline', type: 'L'}
  ]
  sexes: Sex[] = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Un Known" }
  ]
  AddtypeList: AddType[] = [
    { id: 1, name: 'Permanet', type: 'P' },
    { id: 2, name: 'Temporary', type: 'T' }
  ]
  relationtypeList: RelationType[] = [
    { id: 0, name: 'Father' },
    { id: 1, name: 'Mother' },
    { id: 2, name: 'Uncle'},
    { id: 3, name: 'Brother'},
    { id: 4, name: 'Sister' },
    { id: 5, name: 'Guardian'},
  ]
  parentTypeList: AddType[]=[
    { id: 1, name: 'Father', type: 'F' },
    { id: 2, name: 'Mother', type: 'M' },
    { id: 3, name: 'Self', type: 'S' },
  ]
  isHidden: boolean=false;
  isRegDisabled: boolean=true;
  
  // initX() {
  //   return this.fb.group({
  //     //  ---------------------forms fields on x level ------------------------
  //     'X': ['X', [Validators.required, Validators.pattern('[0-9]{4}')]],
  //     // ---------------------------------------------------------------------
  //     'X2':['X2'],
  //     'Ys': this.fb.array([
  //       this.initY()
  //     ])
  //   });
  // }
  // initY() {
  //   return this.fb.group({
  //     //  ---------------------forms fields on y level ------------------------
  //     'Y1': ['Y1', [Validators.required, Validators.pattern('[0-9]{4}')]],
  //     'Y2': ['Y2', [Validators.required, Validators.pattern('[0-9]{4}')]],
  //     // ---------------------------------------------------------------------
  //     'Zs': this.fb.array([
  //       this.initZ()
  //     ])
  //   })
  // }
  // initZ() {
  //   return this.fb.group({
  //     //  ---------------------forms fields on z level ------------------------
  //     'Z': ['Z', [Validators.required, Validators.pattern('[0-9]{4}')]],
  //     // ---------------------------------------------------------------------
  //   })
  // }

  // addX() {
  //   const control = <FormArray>this.empForm.controls['Xs'];
  //   control.push(this.initX());
  // }


  // addY(ix) {
  //   const control = (<FormArray>this.empForm.controls['Xs']).at(ix).get('Ys') as FormArray;
  //   control.push(this.initY());
  // }

  // addZ(ix, iy) {
  //   const control = ((<FormArray>this.empForm.controls['Xs']).at(ix).get('Ys') as FormArray).at(iy).get('Zs') as FormArray;
  //   control.push(this.initZ());
  // }



  get addresses() {
    return this.empForm.get('addresses') as FormArray;
  }
  // addAlias() {    
  //   console.log(this.addresses.push(this.fb.control('')));     
  // }

  addAddressFormGroup(): FormGroup {
    return this.fb.group({
      'ADDDESC': ['']
    });
  }

  year = new Date().getFullYear();
  month = new Date().getMonth();
  day = new Date().getDay();
  startDate = new Date(this.year - 3, this.month, this.day);

  ADIMNO: number = 0;
  _yearAdm: number = new Date().getFullYear();
  _class: string = 'TWO'
  EMP_ID: string = this.ADIMNO + "-" + this._class + "-" + this._yearAdm;
  EMP_REG: string;
  TRNNO: String;


  //declare id of class 
  cl_id: number = null;
  SelectedSectionsList: any = [];

  //declare id of Fee Type
  FeeType: string = null;
  _certType: string= null;
  hidden = false;
  //when chage admission number
  onChangeAdm() {
    this.TRNNO=this.EmpList[this.EmpList.length-1].TRNNO;
    this.EMP_ID = this.ADIMNO + "-" + this._class + "-" + this._yearAdm;
    console.log(this.EMP_ID)
  }
  //when chang admission date 
  ADT: Date;
  onChangeAdmDT($event) {
    console.log($event);
    console.log(this.empForm.value.DAT)
    this._yearAdm = this.empForm.value.DAT.getFullYear();
    this.ADIMNO = this.ADIMNO;
    this.EMP_ID = this.ADIMNO + "-" + this._class + "-" + this._yearAdm;
    console.log(this._yearAdm)
  }

  updateCalcs($event) {    
    if ($event == NaN || $event == undefined) {
      this._yearAdm = new Date().getFullYear();
    } else {
      this._yearAdm = new Date($event).getFullYear();
    }
    this.EMP_ID = this.ADIMNO + "-" + this._class + "-" + this._yearAdm;
    console.log(new Date($event).getFullYear());
    //console.log($event);
  }
  onChange($event) {
    console.log($event);
    this._certType = $event.value;
    this.findCertType(this._certType);

  }
  findCertType(certType){
    switch (certType) {
      case 'Y':
        console.log("Y");
        this.isHidden = true;
        break;
      case 'N':
        console.log("N");
        this.isHidden = false;
        this.empForm.value.PSCHDT = '';
        console.log(this.empForm);
        break;
    }
  
  }
  classSelectionChange($event) {
    console.log($event);
    this.cl_id = $event.value;
    this.findSectionByClId(this.cl_id);
    this.findClAbrByClId(this.cl_id);
  }
  feeTypeSelectionChange($event) {
    console.log($event);
    this.FeeType = $event.value;
    this.findFeeType(this.FeeType);
  }
  findClAbrByClId(id) {
    this._class = this.ClassesList.find(x => x.TRNNO == id).CABR;
    this.EMP_ID = this.ADIMNO + "-" + this._class + "-" + this._yearAdm;
  }

  //filter the date to select dates without sunday
  datefilter = date => {
    const day = date.getDay();
    return day != 0;
  }
  //
  maxDate = new Date();

  BpsList: any = [];
  CastsList: any = [];
  GroupsList: any = [];
  ClassesList: any = [];
  SectionsList: any = [];
  EducationsList: any =[];
  StypeList: STypes[] = [
    { id: 1, name: 'Regular No Fee',abr: 'RN' },
    { id: 2, name: 'Left School', abr: 'LS' },
    { id: 3, name: 'Regular Yes Fee', abr: 'RY' },
    { id: 4, name: 'Private Yes Fee', abr: 'PY' },
  ];

  constructor(
    public castService: CastService,
    public bpService: BpService,
    public groupService: GroupService,
    public classService: ClassesService,
    public secdtlService: SecdtlService,
    public emService: EmService,
    public eduService: EduService,    
    private ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.loadCasts();
    this.loadBps();
    this.loadGroups();
    this.loadClasses();
    this.loadSections();
    this.loadEmps();
    this.loadEducations();
  }
  ngAfterContentInit(): void {

  }
  ngAfterViewInit() {
   
  }
  public empForm = this.fb.group({
    TRNNO: [this.TRNNO],
    EMP_ID: ['',{ disabled: true }],
    ADIMNO: ['', Validators.required],
    EMP_NAME: ['', Validators.required],
    CNIC: [''],
    EMP_F_NAME: ['', Validators.required],
    FCNIC: [''],
    DOB: [''],
    BP_TRNNO: ['',Validators.required],
    CST_TRNNO: [1],
    ADT: ['', Validators.required],
    GRPMST_TRNNO: ['', [Validators.required]],
    CL_TRNNO: ['', Validators.required],
    SEC_TRNNO: ['', Validators.required],
    SEX: ['1', Validators.required],
    CERTIFICATE: ['N', Validators.required],
    EMAILST: ['N', [Validators.required,]],
    FTYPE: ['F'],
    FEE: [''],
    PSCHDT: [''],
    STYPE: ['RY'],
    ETYPE: ['S'],
    //emp detail    
    'EMDTLs': this.fb.array([
      // this.addAddressFormGroup()
      //this.fb.control('')
      this._addAddress()
    ]),
    // aliases: this.fb.array([
    //   this.fb.control('')
    // ]),
    // 'Xs': this.fb.array([
    //   this.initX()
    // ]),
    //PHONE 
    'EMDTL1': this.fb.array([
      this._addTelephone()
    ]),

    //EDUCATION
    'EMDTL2': this.fb.array([
      this._addEducation()
    ]),

  })

  // _trnno: number=0;
  // _sr:number=1;
  _addAddress() {
    //this.loadEmps();
    //this._trnno=this.EmpList[this.EmpList.length-1].TRNNO;
    return this.fb.group({
      // 'TRNNO': [this._trnno],
      // 'SR': [this._sr],
      'ADDDESC': ['', [Validators.required]],
      'ADDTYPE': ['P', [Validators.required]]
    })

  }
  _addTelephone() {
    return this.fb.group({
      PHNO: ['0300', Validators.required],
      PHTYPE: ['F', Validators.required],
      RELTION: [0, Validators.required]
    })
  }
  _addEducation() {
    return this.fb.group({
      EDU_TRNNO: [9, Validators.required],
      PTYPE: ['S'],
      YEAR: [],
      GRD: [''],
      PERCENT: [''],
    })

  }

  //addresses: FormArray;
  addNewAddress() {
    const control = <FormArray>this.empForm.controls['EMDTLs'];
    //this._trnno = this.EmpList[this.EmpList.length - 1].TRNNO;
    //control.setValue([{ 'TRNNO': this._trnno, 'SR': this._sr + 1, 'ADDDESC': 'p-516', 'ADDTYPE': 'T' }]);
    control.patchValue([{ 'ADDTYPE': 'P' }]);
    control.insert(0,this._addAddress());
    console.log(this.EmpList[this.EmpList.length - 1].TRNNO);
    console.log(this.empForm.get('EMDTLs').value);
  }
  deleteRow(index: number) {
    const control = this.empForm.get('EMDTLs') as FormArray;    
    control.removeAt(index);    
    console.log(control);
  }
  
  addNewPhone(){
    
    const control = <FormArray>this.empForm.controls['EMDTL1'];
    control.patchValue([{ 'PHNO': '041', 'PHTYPE': 'L' ,RELTION: 1}]);
    control.insert(0,this._addTelephone());    
    
   
  }
  deletePhone(p: number){
    const control = this.empForm.get('EMDTL1') as FormArray;    
    control.removeAt(p);    
    console.log(control);
  }
  addNewEducation(){
    const control = <FormArray>this.empForm.controls['EMDTL2'];
    control.patchValue([{'PTYPE': 'M' }]);
    control.insert(0,this._addEducation());  
  }
  deleteEducation(e:number){
    const control = this.empForm.get('EMDTL2') as FormArray;    
    control.removeAt(e);    
    console.log(control);
  }


  loadEmps() {
    return this.emService.GetEms().subscribe((data: {}) => {
      this.EmpList = data;
    })
  }
  // Issues list
  loadCasts() {
    return this.castService.GetCasts().subscribe((data: {}) => {
      this.CastsList = data;
    })
  }
  loadBps() {
    return this.bpService.GetBps().subscribe((data: {}) => {
      this.BpsList = data;
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
  loadSections() {
    return this.secdtlService.GetSecdtls().subscribe((data: {}) => {
      this.SectionsList = data;
    })
  }
  loadEducations(){
    return this.eduService.GetEdus().subscribe((data: {}) => {
      this.EducationsList = data;
    })
  }
  findSectionByClId(id): void {
    this.SelectedSectionsList = this.SectionsList.filter(x => x.TRNNO == id);
  }
  findFeeType(FeeType) {
    switch (FeeType) {
      case 'O':
        console.log("It is Others");
        this.hidden = true;
        break;
      case 'F':
        console.log("It is Full");
        this.hidden = false;
        this.empForm.value.FEE = '';
        console.log(this.empForm);
        break;
    }
  }
  showMsg: boolean = false;
  onSubmit(){
    console.log(this.empForm.value);
    this.emService.CreateEm(this.empForm.value).subscribe(res => {
      console.log('Employee is added!');
      this.ngZone.run(() => this.router.navigateByUrl('/emp'));
      this.showMsg = true;
    });
  }

  CloseAlert(){
    this.showMsg = false;
    location.reload();
  }
  // get addressesFormGroups() {
  //   return (<FormArray>(<FormGroup>this.empForm.get('EMDTLs')).get('addresses')).controls;
  // }
  // addAddress(): void {
  //   //   this.addresses = this.empForm.get('addresses') as FormArray;
  //   // this.addresses.push(this.addAddressFormGroup());
  // }

  // getLastTrnn() {
  //   this._trnno=this.EmpList[this.EmpList.length-1].TRNNO;
  //   // this.empForm.get('addresses').patchValue({'TRNNO':this._trnno});
  //   // this._trnno=this.EmpList[this.EmpList.length-1]
  //   // console.log(this._trnno);
  // }

}

