import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  CompaniesList: any = [];
  constructor(public compService: CompanyService) { }

  ngOnInit() {
    this.loadCompanies();
  }
  // Issues list
  loadCompanies() {
    return this.compService.GetCompanies().subscribe((data: {}) => {
      this.CompaniesList = data;
    })
  }
  // Delete issue
  // deleteCompany(data) {
  //   const index = this.CompanysList.map(x => {return x.BPNAME}).indexOf(data.BPNAME);
  //   return this.compService.deleteCompany(data.TRNNO).subscribe(res => {
  //     this.CompanysList.splice(index, 1)
  //     console.log('Blood Group deleted!')
  //    })
  // }
  deleteCompany(data) {
    const index = this.CompaniesList.map(x => x.CNAME).indexOf(data.CNAME);
    return this.compService.deleteCompany(data.TRNNO).subscribe(res => {
      this.CompaniesList.splice(index, 1)
      console.log('Company has deleted!')
     })
  }

}