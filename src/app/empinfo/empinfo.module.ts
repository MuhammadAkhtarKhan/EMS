import { NgModule } from '@angular/core';
import { EmpinfoComponent } from './empinfo.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    EmpinfoComponent,
  ],
  imports: [   
    SharedModule
  ],
  exports:[
   
  ]
})
export class EmpinfoModule { }
