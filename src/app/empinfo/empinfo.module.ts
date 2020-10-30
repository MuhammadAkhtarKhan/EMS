import { NgModule } from '@angular/core';
import { EmpinfoComponent } from './empinfo.component';
import { SharedModule } from '../shared/shared.module';
import { EmpinfoRoutingModule } from './empinfo-routing.module';




@NgModule({
  declarations: [
    EmpinfoComponent
  ],
  imports: [   
    SharedModule,
    EmpinfoRoutingModule
  ],
  exports:[
   
  ]
})
export class EmpinfoModule { }
