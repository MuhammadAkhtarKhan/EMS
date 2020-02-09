import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeptService } from '../shared/dept.service';

@Component({
  selector: 'app-edit-dept',
  templateUrl: './edit-dept.component.html',
  styleUrls: ['./edit-dept.component.css']
})
export class EditDeptComponent implements OnInit {

  DeptsList: any = [];
  updateDeptForm: FormGroup;
  constructor(
    private actRoute: ActivatedRoute,
    public dptService: DeptService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.dptService.GetDept(id).subscribe((data) => {
      this.updateDeptForm = this.fb.group({
        ABR: [data.ABR],
        DESCRIP: [data.DESCRIP],
        STATUS: [data.STATUS],
        TRNNO:[data.TRNNO]
      })
    })
   }

  ngOnInit() {
this.updateForm();
  }
  updateForm() {
    this.updateDeptForm = this.fb.group({
      ABR: [''],
      DESCRIP: [''],
      STATUS: [''],
      TRNNO: ['']
    })
  }

  submitForm() {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.dptService.UpdateDept(id, this.updateDeptForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/dpt-list'))
    })
  }

}