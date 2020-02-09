import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {BpComponent} from '../app/bp/bp.component';
import {BpService} from '../app/shared/bp.service';
import { CastService } from './shared/cast.service';
import { ClassesService } from './shared/classes.service';
import { CompanyService } from './shared/company.service';
import { DeptService } from './shared/dept.service';
import { ExamService } from './shared/exam.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BpListComponent } from './bp/bp-list.component';
import { EditBpComponent } from './bp/edit-bp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CastComponent } from './cast/cast.component';
import { CastListComponent } from './cast/cast-list.component';
import { EditCastComponent } from './cast/edit-cast.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassesListComponent } from './classes/classes-list.component';
import { EditClassComponent } from './classes/edit-class.component';
import { CompanyComponent } from './company/company.component';
import { CompanyListComponent } from './company/company-list.component';
import { EditCompanyComponent } from './company/edit-company.component';
import { DeptComponent } from './dept/dept.component';
import { DeptListComponent } from './dept/dept-list.component';
import { EditDeptComponent } from './dept/edit-dept.component';
import { ExamComponent } from './exam/exam.component';
import { ExamListComponent } from './exam/exam-list.component';
import { EditExamComponent } from './exam/edit-exam.component';
import { SubjectComponent } from './subject/subject.component';
import { SubListComponent } from './subject/sub-list.component';
import { EditSubComponent } from './subject/edit-sub.component';
import { EditEduComponent } from './edu/edit-edu.component';
import { EduListComponent } from './edu/edu-list.component';
import { EduComponent } from './edu/edu.component';
import { FeetypeComponent } from './feetype/feetype.component';
import { FeetypeListComponent } from './feetype/feetype-list.component';
import { EditFeetypeComponent } from './feetype/edit-feetype.component';
import { EditLeavetypeComponent } from './leavetype/edit-leavetype.component';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { LeavetypeListComponent } from './leavetype/leavetype-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';




@NgModule({
  declarations: [
    AppComponent,
    BpComponent,
    BpListComponent,
    EditBpComponent,
    PageNotFoundComponent,
    CastComponent,
    CastListComponent,
    EditCastComponent,
    ClassesComponent,
    ClassesListComponent,
    EditClassComponent,
    CompanyComponent,
    CompanyListComponent,
    EditCompanyComponent,
    DeptComponent,
    DeptListComponent,
    EditDeptComponent,
    ExamComponent,
    ExamListComponent,
    EditExamComponent,
    SubjectComponent,
    SubListComponent,
    EditSubComponent,
    EditEduComponent,
    EduListComponent,
    EduComponent,
    FeetypeComponent,
    FeetypeListComponent,
    EditFeetypeComponent,
    EditLeavetypeComponent,
    LeavetypeComponent,
    LeavetypeListComponent
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    BpService,
    CastService,
    ClassesService,
    CompanyService,
    DeptService,
    ExamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
