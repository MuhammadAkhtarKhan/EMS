import { Component, OnInit, NgZone } from '@angular/core';
import { BpService } from '../shared/bp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { statusType } from '../shared/Interfaces/status';

@Component({
  selector: 'app-bp',
  templateUrl: './bp.component.html',
  styleUrls: ['./bp.component.css']
})
export class BpComponent implements OnInit {
  bpForm: FormGroup;
  BpArr: any = [];
  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]
  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public bpService: BpService) 
              { }

  ngOnInit() {
    this.addBp();
  }
  showMsg: boolean = false;
  addBp() {
    this.bpForm = this.fb.group({
      bpname: ['', [Validators.required, Validators.minLength(2)]],
      status: ['A',[Validators.required]]
    });
  }
  submitForm() {
    this.bpService.CreateBp(this.bpForm.value).subscribe(res => {
      console.log('Blood Group added!')
      this.ngZone.run(() => this.router.navigateByUrl('/bp')); 
      
    });
    this.showMsg = true;
  }
  CloseAlert(){
    this.showMsg = false;
    location.reload()
  }

}
