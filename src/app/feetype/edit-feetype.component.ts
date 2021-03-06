import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeTypeService } from '../shared/feetype.service';
import { statusType } from '../shared/Interfaces/status';

@Component({
  selector: 'app-edit-feetype',
  templateUrl: './edit-feetype.component.html',
  styleUrls: ['./edit-feetype.component.css']
})
export class EditFeetypeComponent implements OnInit {
  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]
  FeeTypesList: any = [];
  updateFeeTypeForm: FormGroup;
  constructor(
    private actRoute: ActivatedRoute,
    public feetypeService: FeeTypeService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.feetypeService.GetFeeType(id).subscribe((data) => {
      this.updateFeeTypeForm = this.fb.group({
        FTYPE: [data.FTYPE],
        STATUS: [data.STATUS],
        TRNNO:[data.TRNNO]
      })
    })
   }

  ngOnInit() {
this.updateForm();
  }
  updateForm(){
    this.updateFeeTypeForm = this.fb.group({
      FTYPE: [''],
      STATUS: [''],
      TRNNO: ['']
    })
  }
  showMsg: boolean = false;
  submitForm() {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.feetypeService.UpdateFeeType(id, this.updateFeeTypeForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/feetype/id'))
      this.showMsg = true;
    })
  }
  CloseAlert(){
    this.showMsg = false;
    this.ngZone.run(() => this.router.navigateByUrl('/feetype'))
  }

}