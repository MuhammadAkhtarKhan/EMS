import { Component, OnInit, NgZone } from '@angular/core';
import { CompanyService } from '../shared/company.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  CompanysList: any = [];
  updateCompanyForm: FormGroup;
  constructor(
    private actRoute: ActivatedRoute,
    public bpService: CompanyService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.bpService.GetCompany(id).subscribe((data) => {
      this.updateCompanyForm = this.fb.group({
        CNAME: [data.CNAME],
        PIC: [data.PIC],
        TRNNO:[data.TRNNO]
      })
    })
   }

  ngOnInit() {
this.updateForm();
  }
  updateForm(){
    this.updateCompanyForm = this.fb.group({
      CNAME: [''],
      PIC: [''],
      TRNNO: ['']
    })
  }

  submitForm() {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.bpService.UpdateCompany(id, this.updateCompanyForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/company-list'))
    })
  }

}