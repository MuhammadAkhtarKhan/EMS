import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveTypeService } from '../shared/leavetype.service';
import { statusType } from '../shared/Interfaces/status';

@Component({
  selector: 'app-edit-leavetype',
  templateUrl: './edit-leavetype.component.html',
  styleUrls: ['./edit-leavetype.component.css']
})
export class EditLeavetypeComponent implements OnInit {
  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]
  LeaveTypesList: any = [];
  updateLeaveTypeForm: FormGroup;
  constructor(
    private actRoute: ActivatedRoute,
    public leavetypeService: LeaveTypeService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.leavetypeService.GetLeaveType(id).subscribe((data) => {
      this.updateLeaveTypeForm = this.fb.group({
        LDESC: [data.LDESC],
        LABRV: [data.LABRV],
        LWEIGHT: [data.LWEIGHT],
        STATUS: [data.STATUS],
        TRNNO: [data.TRNNO]
      })
    })
   }

  ngOnInit() {
this.updateForm();
  }
  updateForm(){
    this.updateLeaveTypeForm = this.fb.group({
      LDESC: [''],
      LABRV: [''],
      LWEIGHT:[''],
      STATUS: [''],
      TRNNO: ['']
    })
  }
  showMsg: boolean = false;
  submitForm() {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.leavetypeService.UpdateLeaveType(id, this.updateLeaveTypeForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/leavetype/id'))
      this.showMsg = true;
    })
  }

  CloseAlert(){
    this.showMsg = false;
    this.ngZone.run(() => this.router.navigateByUrl('/leavetype'))
  }

}