import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { CastService } from '../shared/cast.service';
import { BpService } from '../shared/bp.service';
import { GroupService } from '../shared/group.service';
import { ClassesService } from '../shared/classes.service';
import { SecdtlService } from '../shared/secdtl.service';
import { EmService } from '../shared/em.service';
import { EduService } from '../shared/edu.service';
import { Router } from '@angular/router';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment} from 'moment';
import { DateService } from '../shared/date.service';
//import * as moment from 'moment';
const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
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
  selector: 'app-teacherinfo',
  templateUrl: './teacherinfo.component.html',
  styleUrls: ['./teacherinfo.component.css']
})
export class TeacherinfoComponent implements OnInit {

  


  public pickerDate;
  
 // @ViewChild('myDatePickerYEAR')  matdatePicker: MatDatepicker<any>;
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
    { id: 6, name: 'Self'},
  ]
  parentTypeList: AddType[]=[
    { id: 1, name: 'Father', type: 'F' },
    { id: 2, name: 'Mother', type: 'M' },
    { id: 3, name: 'Self', type: 'S' },
  ]
  isHidden: boolean=false;
  isRegDisabled: boolean=true;

  year = new Date().getFullYear();
  month = new Date().getMonth();
  day = new Date().getDay();
  startDate = new Date(this.year - 3, this.month, this.day);
  startYear= new Date(this.year, this.month)

  ADIMNO: number = 0;
  _yearAdm: number = new Date().getFullYear();
  _class: string = 'TWO'
  EMP_ID: string = this.ADIMNO + "-" + this._class + "-" + this._yearAdm;
  EMP_REG: string;
  TRNNO: string='';


  //declare id of class 
  cl_id: number = null;
  SelectedSectionsList: any = [];

  //declare id of Fee Type
  FeeType: string = null;
  _certType: string= null;
  hidden = false;
  dateAdded: string;


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
    console.log($event);
  }
 

  //filter the date to select dates without sunday
  // datefilter = date => {
  //   const day = date.getDay();
  //   return day != 0;
  // }
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
    public dateService: DateService,   
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
  
  public empForm = this.fb.group({
    TRNNO: [this.TRNNO],
    EMP_ID: ['',{ disabled: true }],   
    EMP_NAME: ['', Validators.required],
    CNIC: [''],
    EMP_F_NAME: ['', Validators.required],   
    DOB: [''],
    BP_TRNNO: ['',Validators.required],
    CST_TRNNO: [1],    
    SEX: ['1', Validators.required],    
    EMAIL: ['', [Validators.required,]],      
    ETYPE: ['T'],
    BSAL:[,[Validators.required]],
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
      PHTYPE: ['M', Validators.required],
      RELTION: [6, Validators.required]
    })
  }
  _addEducation() {
    return this.fb.group({
      EDU_TRNNO: [9, Validators.required], 
      PTYPE:['S'],     
      YEAR: [],
      GRD: ['',Validators.required],
      PERCENT: ['',Validators.required],    
     
    })

  }

  //addresses: FormArray;
  addNewAddress() {
    const control = <FormArray>this.empForm.controls['EMDTLs'];
    //this._trnno = this.EmpList[this.EmpList.length - 1].TRNNO;
    //control.setValue([{ 'TRNNO': this._trnno, 'SR': this._sr + 1, 'ADDDESC': 'p-516', 'ADDTYPE': 'T' }]);
    //control.patchValue([{'ADDTYPE': 'T' }]);
    control.insert(0,this._addAddress());
    console.log(this.EmpList[this.EmpList.length - 1].TRNNO);
    console.log(this.empForm.get('EMDTLs').value);
  }
  deleteRow(index: number) {
    const control = this.empForm.get('EMDTLs') as FormArray;    
    control.removeAt(control.length - 1);    
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
    control.patchValue([{'PTYPE': 'S'}]);
    console.log(control);
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
//   onYearSelected(event){
// console.log(event);
//     this.pickerDate = moment(event).format('YYYY');
//     const control = <FormArray>this.empForm.controls['EMDTL2'];
//     control.patchValue([{YEAR: this.pickerDate }]);
//    // control.insert(0,this._addEducation());  
//     console.log(control);
//     this.matdatePicker.close();

//   }
//(yearSelected)="chosenYearHandler($event)"
 myYear = new FormControl(moment());
 

  // chosenYearHandler(normalizedYear: Moment,datepicker: MatDatepicker<Moment>) {
  //  // const   ctrlValue =this.empForm['controls'].EMDTL2['controls'];
  //  const selecetedYear=normalizedYear.year();
  //   console.log(selecetedYear);
  //   const   ctrlValue =this.empForm.get('EMDTL2') as FormArray;
  //   console.log(ctrlValue);
  //   for (let c of  ctrlValue.controls) {
  //     c.patchValue([{ADT:selecetedYear}])
      
  //    console.log(c.value)
  //     //const element = array[index];
      
  //   };
  //   console.log(ctrlValue)
    
  //   //ctrlValue.patchValue({'ADT':selecetedYear});
  //   //ctrlValue as FormControl(moment())
  //  console.log(ctrlValue);
  //   //const ctrlValue = _ADT.value;
  //   //ctrlValue.year(normalizedYear.year());
  //   //ctrlValue.setValue(ctrlValue);
  //   datepicker.close();
  // }
  //selectedYear: string;
  // chosenYearHandler(normalizedYear: Moment,datepicker: MatDatepicker<Moment>,index) {
  //    const   ctrlValue =this.empForm['controls'].EMDTL2['controls'][index] as FormArray;
  //    console.log(ctrlValue);
  //     const selectedYear=normalizedYear.year();
  //    //const control = <FormArray>this.empForm.controls['EMDTL2'];
  //    ctrlValue.patchValue([{'YEAR': selectedYear }]) ;
         
  //    console.log(ctrlValue);
  //   //const myctrl=<FormArray>control.controls[index]
  //   //myctrl.patchValue([{'YEAR': selecetedYear }]);    
  //   //control.insert(index, myctrl)
  //    //this.updateDateAdded(datepicker)
     
  //    //datepicker.close();
  // }
  //autocomplete: string;
  toFormattedDate(iso: string,datepicker: MatDatepicker<Moment>){
    const date = new Date(iso);
    console.log(date);
    const year=`${date.getFullYear()}`;
    const control = <FormArray>this.empForm.controls['EMDTL2'];
    control.patchValue([{'YEAR': year }]);
    datepicker.close();
    return `${date.getFullYear()}`;
    // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  updateField($event){
    console.log($event)
  }
  updateDateAdded(dateAdded){
    this.dateAdded = this.dateService.formatDate(dateAdded);
  }

  // chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.myYear.value;
  //   ctrlValue.month(normalizedMonth.month());
  //   this.myYear.setValue(ctrlValue);
  //   datepicker.close();
  // }

  showMsg: boolean = false;
  onSubmit(){
    console.log(this.empForm.value);
    this.emService.CreateEm(this.empForm.value).subscribe(res => {
      console.log('Teacher is added!');
      this.ngZone.run(() => this.router.navigateByUrl('/teachinfo'));
      this.showMsg = true;
    });
  } 

  CloseAlert(){
    this.showMsg = false;
    location.reload();
  }

}

