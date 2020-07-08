import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { SubjectService } from '../shared/subject.service';
import { GroupService } from '../shared/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  CampusList: any = [{ id: 1, name: 'Campus A' }, { id: 2, name: 'Campus B' }]
  SubjectsList: any = [];
  message: string = "Please complete the fields";
  _sname: any;

  constructor(
    public subService: SubjectService,
    public groupService: GroupService,
    private ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  //#region add New Group
  public createNewGroupForm = this.fb.group({
    GRPNAME: ['', [Validators.required]],
    DT: ['', [Validators.required]],
    COMPDTL_TRNNO: ['', [Validators.required]],
    'GRPDTLs': this.fb.array([
      this._addNewSubject()
    ]),

  });
  _addNewSubject() {
    return this.fb.group({
      'TRNNO': [],
      'SCODE': ['', [Validators.required]],
    })
  }
  addNewSuject() {
    const control = <FormArray>this.createNewGroupForm.controls['GRPDTLs'];
    //this._trnno = this.EmpList[this.EmpList.length - 1].TRNNO;
    //control.setValue([{ 'TRNNO': this._trnno, 'SR': this._sr + 1, 'ADDDESC': 'p-516', 'ADDTYPE': 'T' }]);
    //control.patchValue([{ 'SCODE':'' }]);
    control.insert(0, this._addNewSubject());
    //console.log(this.EmpList[this.EmpList.length - 1].TRNNO);
    console.log(this.createNewGroupForm.get('GRPDTLs').value);
  }
  deleteRow(ix: number) {
    const control = this.createNewGroupForm.get('GRPDTLs') as FormArray;
    control.removeAt(ix);
    console.log(control);
  }
  loadSubjects() {
    return this.subService.GetSubjects().subscribe((data: {}) => {
      this.SubjectsList = data;

    })
  }
  subjectSelectionChange(ix: number, $event) {
    //console.log($event.value);
    const _sub_trnno = $event.value;

    this.findScode(ix, _sub_trnno);
  }
  findScode(ix, _sub_trnno) {
    //const control = <FormArray>this.addNewMarksForm.controls['MARKTOTALDTLs'];
    // this.addNewMarksForm.get(`MARKTOTALDTLs.${ix}.SCODE`).setValue(this._scode);
    //<FormArray>this.addNewMarksForm.controls['MARKTOTALDTLs'].controls[ix].controls['SCODE'].setValue(ID);
    //console.log(control.at(ix));
    //console.log(control);
    const data = this.SubjectsList.filter(x => x.TRNNO == _sub_trnno);
    console.log(data[0].SCODE);
    const _scode = data[0].SCODE;
     this._sname=data[0].SNAME;
    this.createNewGroupForm.get(`GRPDTLs.${ix}.SCODE`).setValue(_scode);
    //this.createNewGroupForm.get(`GRPDTLs.${ix}.TRNNO`).patchValue(_sub_trnno);    
    // for (var i = 0; i < this.SubjectsList.length; i++) {
    //   if (this.SubjectsList[i].TRNNO == _sub_trnno) {
    //     var el = this.SubjectsList.splice(i, 1);
    //    // this.SubjectsList=el;
    //     return
    //   }      
    // }
    // console.log(this.SubjectsList);
  }

  onSubmitGroups() {
    this.groupService.CreateGroup(this.createNewGroupForm.value).subscribe(res => {
      console.log('Your have created group Successfully!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }
  //#endregion Add New Group
  ngOnInit(): void {
    this.loadSubjects();
  }

}
