import { Component, OnInit, NgZone } from '@angular/core';
import { BpService } from '../shared/bp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bp',
  templateUrl: './bp.component.html',
  styleUrls: ['./bp.component.css']
})
export class BpComponent implements OnInit {
  bpForm: FormGroup;
  BpArr: any = [];

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public bpService: BpService) { }

  ngOnInit() {
    this.addBp();
  }
  addBp() {
    this.bpForm = this.fb.group({
      bpname: [''],
      status: ['']
    });
  }
  submitForm() {
    this.bpService.CreateBp(this.bpForm.value).subscribe(res => {
      console.log('Blood Group added!')
      this.ngZone.run(() => this.router.navigateByUrl('/issues-list'));
    });
  }

}
