import { NgModule } from '@angular/core';

import {MatButtonModule,
   MatToolbarModule,
   MatSidenavModule,
   MatTreeModule,
   MatIconModule
  } from '@angular/material';





const Material = [
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTreeModule,
  MatIconModule
];
@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
