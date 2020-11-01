import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { EmpinfoComponent } from './empinfo.component';
import { AuthGuard } from '../shared/auth.guard';

const empRoutes: Routes=[
   { path: '', component: EmpinfoComponent, canActivate:[AuthGuard] },
    //{ path: 'emp/:id', component: EditExamComponent, canActivate:[AuthGuard] },
]


@NgModule({
  declarations: [],
  imports: [
   RouterModule.forChild(empRoutes)
  ],
  exports: [RouterModule]
})
export class EmpinfoRoutingModule { }
