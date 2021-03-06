import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeeTypeService } from '../shared/feetype.service';

@Component({
  selector: 'app-feetype',
  templateUrl: './feetype.component.html',
  styleUrls: ['./feetype.component.css']
})
export class FeetypeComponent implements OnInit {

  feetypeForm: FormGroup;
  FeeTypeArr: any = [];

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public feetypeService: FeeTypeService) { }

  ngOnInit() {
    this.addFeeType();
  }
  addFeeType() {
    this.feetypeForm = this.fb.group({
      ftype: ['',[Validators.required]],
      status: ['A']
    });
  }
  showMsg: boolean = false;

  submitForm() {
    this.feetypeService.CreateFeeType(this.feetypeForm.value).subscribe(res => {
      console.log('Fee Type has added!')
      this.ngZone.run(() => this.router.navigateByUrl('/feetype'));
      this.showMsg = true;
    });
  }

  CloseAlert(){
    this.showMsg = false;
    location.reload();
  }

}
