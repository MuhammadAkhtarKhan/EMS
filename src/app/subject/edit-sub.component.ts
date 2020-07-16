import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../shared/subject.service';

@Component({
  selector: 'app-edit-sub',
  templateUrl: './edit-sub.component.html',
  styleUrls: ['./edit-sub.component.css']
})
export class EditSubComponent implements OnInit {

  SubjectsList: any = [];
  updateSubjectForm: FormGroup;
  constructor(
    private actRoute: ActivatedRoute,
    public subService: SubjectService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.subService.GetSubject(id).subscribe((data) => {
      this.updateSubjectForm = this.fb.group({
        SNAME: [data.SNAME],
        SCODE: [data.SCODE],
        TRNNO: [data.TRNNO]
      });
    });
   }

  ngOnInit() {
this.updateForm();
  }
  updateForm() {
    this.updateSubjectForm = this.fb.group({
      SNAME: [''],
      SCODE: [''],
      TRNNO: ['']
    // tslint:disable-next-line: semicolon
    })
  }
  showMsg: boolean = false;
  submitForm() {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.subService.UpdateSubject(id, this.updateSubjectForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/subject/id'));
      this.showMsg = true;
    });
  }

  CloseAlert(){
    this.showMsg = false;
    this.ngZone.run(() => this.router.navigateByUrl('/subject'));
  }
}
