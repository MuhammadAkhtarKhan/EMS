import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EduService } from '../shared/edu.service';

@Component({
  selector: 'app-edu',
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.css']
})
export class EduComponent implements OnInit {

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
      status: ['']
    });
  }
  submitForm() {
    this.eduService.CreateEdu(this.eduForm.value).subscribe(res => {
      console.log('Education has added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }

}

