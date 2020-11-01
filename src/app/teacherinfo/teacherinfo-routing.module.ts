import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { TeacherinfoComponent } from './teacherinfo.component';

const teacherInfoRoutes: Routes=[
  { path: '', component: TeacherinfoComponent, canActivate:[AuthGuard] },
  // { path: 'bp/:id', component: EditBpComponent, canActivate:[AuthGuard] },
  // { path: 'bp', component: BpListComponent, canActivate:[AuthGuard] },
]

@NgModule({ 
  imports: [
    RouterModule.forChild(teacherInfoRoutes)
  ],
  exports:[RouterModule]
})
export class TeacherinfoRoutingModule { }
