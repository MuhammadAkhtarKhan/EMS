import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ChartsModule } from 'ng2-charts';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {CdkStepperModule,STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import { AppRoutingModule } from './app-routing.module';
// import { EmpinfoModule } from './empinfo/empinfo.module';
import { MaterialModule } from './material/material.module';


import {BpService} from '../app/shared/bp.service';
import { CastService } from './shared/cast.service';
import { ClassesService } from './shared/classes.service';
import { CompanyService } from './shared/company.service';
import { DeptService } from './shared/dept.service';
import { ExamService } from './shared/exam.service';
import { GroupService } from './shared/group.service';
import { SecdtlService } from './shared/secdtl.service';
import { MarksService } from './shared/marks.service';
import { EduService } from './shared/edu.service';
import { EmService } from './shared/em.service';
import { FeeTypeService } from './shared/feetype.service';
import { LeaveTypeService } from './shared/leavetype.service';
import { SubjectService } from './shared/subject.service';
import { DateService } from './shared/date.service';
import { AuthService } from './shared/auth.service';

import { AuthGuard } from './shared/auth.guard';
import { TokenizedInterceptor } from './Tokenized-Interceptor';

import { ListFilterPipe } from './groupchange/list-filter.pipe';


import { AppComponent } from './app.component';
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
import { NavigationpageComponent } from './navigationpage/navigationpage.component';

// import { TeacherinfoComponent, MY_FORMATS } from './teacherinfo/teacherinfo.component';
import { MarkssheetComponent } from './markssheet/markssheet.component';
import { TotalmarksComponent, UniquePipe } from './totalmarks/totalmarks.component';
import { TotalmarksListComponent } from './totalmarks/totalmarks-list.component';
import { EditTotalmarksComponent } from './totalmarks/edit-totalmarks.component';
import { GroupsComponent } from './groups/groups.component';
import { EditGroupsComponent } from './groups/edit-groups.component';
import { FeecollectComponent } from './feecollect/feecollect.component';
import { ClassfeeComponent } from './classfee/classfee.component';
import { EditClassfeeComponent } from './classfee/edit-classfee.component';
import { SpfeeComponent } from './spfee/spfee.component';
import { SectionsComponent } from './sections/sections.component';
import { EditSectionsComponent } from './sections/edit-sections.component';
import { GroupchangeComponent } from './groupchange/groupchange.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';

import { PromotionComponent } from './promotion/promotion.component';
import { LschoolComponent } from './lschool/lschool.component';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ShiftCurserDirective } from './shared/directives/shift-curser.directive';
import { ClassfeeService } from './shared/classfee.service';
import { ClFeedtlService } from './shared/clfeedtl.service';
import { feecollectService } from './shared/feecollect.service';
import { GroupChangeService } from './shared/grpchange.service';
import { LSchoolService } from './shared/lschool.service';
import { PromotionService } from './shared/promotion.service';
import { SectionsService } from './shared/section.service';
import { SpFeeService } from './shared/spfee.service';
import { StudentService } from './shared/student.service';
import { TeacherService } from './shared/teacher.service';
import { TotalmarkService } from './shared/totalmark.service';
import { TotalmarksdtlService } from './shared/totamarksdtl.service';





@NgModule({
  declarations: [
    AppComponent,  
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
    LeavetypeListComponent,
    NavigationpageComponent,   
    MarkssheetComponent,
    TotalmarksComponent,
    UniquePipe,    
    TotalmarksListComponent,
    EditTotalmarksComponent,
    GroupsComponent,
    EditGroupsComponent,
    FeecollectComponent,
    ClassfeeComponent,
    EditClassfeeComponent,
    SpfeeComponent,
    SectionsComponent,
    EditSectionsComponent,
    GroupchangeComponent,
    SearchComponent,
    DetailsComponent,
    ListFilterPipe,
    PromotionComponent,
    LschoolComponent,
    LoginComponent,
    DashboardComponent,
    ShiftCurserDirective,
    
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    LayoutModule,
    CdkStepperModule,    
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ChartsModule,
       
  ],
  providers: [
    UniquePipe,    
    BpService,
    CastService,
    ClassesService,
    CompanyService,
    DeptService,
    EduService,
    EmService,
    ExamService,
    FeeTypeService,
    GroupService,
    LeaveTypeService,
    SecdtlService,
    DateService,
    MarksService,
    SubjectService,
    AuthGuard,
    AuthService,
    ClassfeeService,
    ClFeedtlService,
    feecollectService,
    GroupChangeService,
    LSchoolService,
    PromotionService,
    SectionsService,
    SpFeeService,
    StudentService,
    TeacherService,
    TotalmarkService,
    TotalmarksdtlService,
        
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},  
    {provide: HTTP_INTERCEPTORS, useClass: TokenizedInterceptor, multi: true},  
    // {
    //   provide: STEPPER_GLOBAL_OPTIONS,
    //   useValue: { displayDefaultIndicatorType: false }
    // },
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },

    //{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
