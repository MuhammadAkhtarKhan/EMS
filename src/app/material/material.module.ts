import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';





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
