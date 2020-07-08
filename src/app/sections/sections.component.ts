import { Component, OnInit, NgZone } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassesService } from '../shared/classes.service';
import { SectionsService } from '../shared/section.service';
import { statusType } from '../shared/Interfaces/status';



@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  ClassesList: any = [];
  SectionsList: any = [];
  SectionsDetailList: any = [];
  SelectedDetailList: any = [];
  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]
  constructor(
    public classService: ClassesService,
    public sectionService: SectionsService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
  ) { }
  public sectionsForm = this.fb.group({
    TRNNO: [0],
    CLASS_TRNNO: [, [Validators.required]],
    'SECDTLs': this.fb.array([
      this._addSection()
    ])
  })
  _addSection() {
    return this.fb.group({
      'TRNNO': [0],
      'SR': [],
      'SNAME': [],
      'STATUS': ['A'],
    })
  }
  addNewSection() {
    const control = <FormArray>this.sectionsForm.controls['SECDTLs'];
    control.insert(0, this._addSection());
  }

  classSelectionChange($event) {
    const control = this.sectionsForm.get('SECDTLs') as FormArray;
    while (control.length !== 0) {
      control.removeAt(0)
    }
    this.addNewSection();
    const cl_id = $event.value;
    console.log(cl_id);
    this.findSectionIdByCl_Id(cl_id);
  }
  findSectionIdByCl_Id(cl_id: number) {
    const _trnno = this.SectionsList.find(x => x.CLASS_TRNNO == cl_id).TRNNO;
    this.SelectedDetailList = this.SectionsDetailList.filter(x => x.TRNNO == _trnno);
    console.log(this.SelectedDetailList);

    if (this.SelectedDetailList.length > 0) {
      for (let i = 0; i < this.SelectedDetailList.length; i++) {
        if (i != 0) {
          this.addNewSection();
        }
        const control = this.sectionsForm.get('SECDTLs') as FormArray;
        control.patchValue([
          { 'TRNNO': this.SelectedDetailList[i].TRNNO, 'SR': this.SelectedDetailList[i].SR, 'SNAME': this.SelectedDetailList[i].SNAME, 'STATUS': this.SelectedDetailList[i].STATUS }
        ]);
        console.log(this.SelectedDetailList[i]);
      }

    } 
  }
  deleteRow(index: number) {
    const control = this.sectionsForm.get('SECDTLs') as FormArray;
    control.removeAt(index);
    console.log(control);
  }

  ngOnInit(): void {
    this.loadClasses();
    this.loadSections();
    this.loadSectionsDetail();
  }
  loadClasses() {
    return this.classService.GetClasses().subscribe((data: {}) => {
      this.ClassesList = data;
    })
  }
  loadSections() {
    return this.sectionService.GetSections().subscribe((data: {}) => {
      this.SectionsList = data;
    })
  }
  loadSectionsDetail() {
    return this.sectionService.GetSectionsDetail().subscribe((data: {}) => {
      this.SectionsDetailList = data;
    })
  }
  onSubmitSection() {
    this.sectionService.CreateSections(this.sectionsForm.value).subscribe(res => {
      console.log('Section/Sections created!');
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    })
  }
}
