import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EduService } from '../shared/edu.service';
import { statusType } from '../shared/Interfaces/status';

@Component({
  selector: 'app-edu',
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.css']
})
export class EduComponent implements OnInit {
  StatusTypeList: statusType[] = [
    { id: 1, status: 'A', state: 'Active' },
    { id: 2, status: 'D', state: 'De Active' }
  ]
  eduForm: FormGroup;
  EduArr: any = [];

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public eduService: EduService) { }

  ngOnInit() {
    this.addEdu();
  }
  addEdu() {
    this.eduForm = this.fb.group({
      dname: [''],
      dabrv: [''],
      status: ['A']
    });
  }
  showMsg: boolean = false;
  submitForm() {
    this.eduService.CreateEdu(this.eduForm.value).subscribe(res => {
      console.log('Education has added!')
      this.ngZone.run(() => this.router.navigateByUrl('/edu'));
      this.showMsg = true;
    });
  }

  CloseAlert(){
    this.showMsg = false;
    location.reload();
  }

}

