import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassesService } from '../shared/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  clsForm: FormGroup;
  ClassArr: any = [];

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public clsService: ClassesService) { }

  ngOnInit() {
    this.addClass();
  }
  addClass() {
    this.clsForm = this.fb.group({
      CNAME: [''],
      CABR: ['']
    });
  }
  submitForm() {
    this.clsService.CreateClass(this.clsForm.value).subscribe(res => {
      console.log('Class has added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }

}

