import { Component, OnInit, NgZone } from '@angular/core';
import { BpService } from '../shared/bp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Bp } from '../models/bp';

@Component({
  selector: 'app-edit-bp',
  templateUrl: './edit-bp.component.html',
  styleUrls: ['./edit-bp.component.css']
})
export class EditBpComponent implements OnInit {
  BpsList: any = [];
  updateBpForm: FormGroup;
  constructor(
    private actRoute: ActivatedRoute,
    public bpService: BpService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.bpService.GetBp(id).subscribe((data) => {
      this.updateBpForm = this.fb.group({
        BPNAME: [data.BPNAME],
        STATUS: [data.STATUS],
        TRNNO:[data.TRNNO]
      })
    })
   }

  ngOnInit() {
this.updateForm();
  }
  updateForm(){
    this.updateBpForm = this.fb.group({
      BPNAME: [''],
      STATUS: [''],
      TRNNO: ['']
    })
  }

  submitForm() {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.bpService.UpdateBp(id, this.updateBpForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/bp-list'))
    })
  }

}
