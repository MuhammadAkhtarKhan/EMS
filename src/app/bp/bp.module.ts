import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpListComponent } from './bp-list.component';
import { BpComponent } from './bp.component';
import { EditBpComponent } from './edit-bp.component';
import { BpRoutingModule } from './bp-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
     BpComponent,
    BpListComponent,
    EditBpComponent,
  ],
  imports: [
    SharedModule,
    BpRoutingModule
  ]
})
export class BpModule { }
