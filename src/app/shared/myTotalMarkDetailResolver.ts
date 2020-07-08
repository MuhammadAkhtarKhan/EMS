import { Injectable } from '@angular/core';import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';import { Observable } from 'rxjs';
import { TotalMarksDtlSubjects } from '../models/totalmarkdtlsubject';
import { TotalmarksdtlService } from './totamarksdtl.service';
import { identifierModuleUrl } from '@angular/compiler';


@Injectable({ providedIn: 'any' })
export class TotalMarkDetailResolver implements Resolve<any> {
    public detail: any;
    id: string;
  constructor(
      private service: TotalmarksdtlService, 
       private activatedRoute: ActivatedRoute,
       
    ) {
      
      var snapshot=this.activatedRoute.snapshot;
      this.id=snapshot.paramMap.get('id');

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) 
    {
     this.service.GetTotalMarksDtls(this.id).subscribe(
         data=>{this.detail=data},
         err=>{console.log(err)},
         ()=>{console.log(this.detail)}
     );
     return this.detail
  }
}