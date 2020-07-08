import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      ftype: [''],
      status: ['A']
    });
  }
  submitForm() {
    this.feetypeService.CreateFeeType(this.feetypeForm.value).subscribe(res => {
      console.log('Fee Type has added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }

}
