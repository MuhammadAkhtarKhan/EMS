import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../shared/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  compForm: FormGroup;
  CompanyArr: any = [];

  constructor(public fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              public compService: CompanyService) { }

  ngOnInit() {
    this.addCompany();
  }
  addCompany() {
    this.compForm = this.fb.group({
      cname: [''],
      pic: ['']
    });
  }
  submitForm() {
    this.compService.CreateCompany(this.compForm.value).subscribe(res => {
      console.log('Company has added!')
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }

}
