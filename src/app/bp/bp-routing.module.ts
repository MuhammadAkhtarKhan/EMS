import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BpListComponent } from './bp-list.component';
import { AuthGuard } from '../shared/auth.guard';
import { BpComponent } from './bp.component';
import { EditBpComponent } from './edit-bp.component';

const bpRoutes: Routes=[
    { path: '', component: BpComponent, canActivate:[AuthGuard] },
    { path: 'bp/:id', component: EditBpComponent, canActivate:[AuthGuard] },
    { path: 'bp', component: BpListComponent, canActivate:[AuthGuard] },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(bpRoutes)
  ],
  exports:[RouterModule]
})
export class BpRoutingModule { }
