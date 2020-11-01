import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherinfoRoutingModule } from './teacherinfo-routing.module';
import { TeacherinfoComponent } from './teacherinfo.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [TeacherinfoComponent],
  imports: [
    SharedModule,
    TeacherinfoRoutingModule
  ]
})
export class TeacherinfoModule { }
