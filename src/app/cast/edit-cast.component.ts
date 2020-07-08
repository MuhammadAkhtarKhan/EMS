import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CastService } from '../shared/cast.service';
import { statusType } from '../shared/Interfaces/status';

@Component({
  selector: 'app-edit-cast',
  templateUrl: './edit-cast.component.html',
  styleUrls: ['./edit-cast.component.css']
})
export class EditCastComponent implements OnInit {
  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]
  CastsList: any = [];
  updateCastForm: FormGroup;
  constructor(
    private actRoute: ActivatedRoute,
    public cstService: CastService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.cstService.GetCast(id).subscribe((data) => {
      this.updateCastForm = this.fb.group({
        CDESC: [data.CDESC],
        STATUS: [data.STATUS],
        TRNNO:[data.TRNNO]
      })
    })
   }

  ngOnInit() {
this.updateForm();
  }
  updateForm() {
    this.updateCastForm = this.fb.group({
      CDESC: [''],
      STATUS: [''],
      TRNNO: ['']
    })
  }

  submitForm() {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.cstService.UpdateCast(id, this.updateCastForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/cast-list'))
    })
  }

}
