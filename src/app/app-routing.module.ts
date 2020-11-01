import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BpListComponent } from './bp/bp-list.component';
import { BpComponent } from './bp/bp.component';
import { EditBpComponent } from './bp/edit-bp.component';
import { CastComponent } from './cast/cast.component';
import { EditCastComponent } from './cast/edit-cast.component';
import { CastListComponent } from './cast/cast-list.component';
import { ClassesComponent } from './classes/classes.component';
import { EditClassComponent } from './classes/edit-class.component';
import { ClassesListComponent } from './classes/classes-list.component';
import { DeptComponent } from './dept/dept.component';
import { EditDeptComponent } from './dept/edit-dept.component';
import { DeptListComponent } from './dept/dept-list.component';
import { EditEduComponent } from './edu/edit-edu.component';
import { EduComponent } from './edu/edu.component';
import { EduListComponent } from './edu/edu-list.component';
import { EditFeetypeComponent } from './feetype/edit-feetype.component';
import { FeetypeComponent } from './feetype/feetype.component';
import { FeetypeListComponent } from './feetype/feetype-list.component';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { LeavetypeListComponent } from './leavetype/leavetype-list.component';
import { EditLeavetypeComponent } from './leavetype/edit-leavetype.component';
import { SubListComponent } from './subject/sub-list.component';
import { EditSubComponent } from './subject/edit-sub.component';
import { SubjectComponent } from './subject/subject.component';
import { ExamComponent } from './exam/exam.component';
import { EditExamComponent } from './exam/edit-exam.component';
import { ExamListComponent } from './exam/exam-list.component';
import { EmpinfoComponent } from './empinfo/empinfo.component';
import { TeacherinfoComponent } from './teacherinfo/teacherinfo.component';
import { EditTotalmarksComponent } from './totalmarks/edit-totalmarks.component';
import { TotalmarksComponent } from './totalmarks/totalmarks.component';
import { GroupsComponent } from './groups/groups.component';
import { EditGroupsComponent } from './groups/edit-groups.component';
import { FeecollectComponent } from './feecollect/feecollect.component';
import { ClassfeeComponent } from './classfee/classfee.component';
import { SpfeeComponent } from './spfee/spfee.component';
import { SectionsComponent } from './sections/sections.component';
import { EditSectionsComponent } from './sections/edit-sections.component';
import { GroupchangeComponent } from './groupchange/groupchange.component';
import {PromotionComponent} from './promotion/promotion.component'
import { LschoolComponent } from './lschool/lschool.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { NavigationpageComponent } from './navigationpage/navigationpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MarkssheetComponent } from './markssheet/markssheet.component';
import {BpModule} from './bp/bp.module';
import{EmpinfoModule} from './empinfo/empinfo.module';
import{TeacherinfoModule} from './teacherinfo/teacherinfo.module'



const routes: Routes = [
   
  // { path: '', component: NavigationpageComponent, canActivate:[AuthGuard]}, 
    // { path: 'bp', component: BpComponent, canActivate:[AuthGuard] },
    // { path: 'bp/:id', component: EditBpComponent, canActivate:[AuthGuard] },
    // { path: 'bp', component: BpListComponent, canActivate:[AuthGuard] },
    {path:'bp', loadChildren: './bp/bp.module#BpModule'},
    { path: 'emp', loadChildren:'./empinfo/empinfo.module#EmpinfoModule'},
    { path: 'cast', component: CastComponent, canActivate:[AuthGuard] },
    { path: 'cast/:id', component: EditCastComponent, canActivate:[AuthGuard] },
    { path: 'cast', component: CastListComponent, canActivate:[AuthGuard] },
    { path: 'classes', component: ClassesComponent, canActivate:[AuthGuard] },
    { path: 'classes/:id', component: EditClassComponent, canActivate:[AuthGuard] },
    { path: 'classes', component: ClassesListComponent, canActivate:[AuthGuard] },
    { path: 'dept', component: DeptComponent, canActivate:[AuthGuard] },
    { path: 'dept/:id', component: EditDeptComponent, canActivate:[AuthGuard] },
    { path: 'dept', component: DeptListComponent, canActivate:[AuthGuard] },
    { path: 'edu', component: EduComponent, canActivate:[AuthGuard] },
    { path: 'edu/:id', component: EditEduComponent, canActivate:[AuthGuard] },
    { path: 'edu', component: EduListComponent, canActivate:[AuthGuard] },
    { path: 'feetype', component: FeetypeComponent, canActivate:[AuthGuard] },
    { path: 'feetype/:id', component: EditFeetypeComponent, canActivate:[AuthGuard] },
    { path: 'feetype', component: FeetypeListComponent, canActivate:[AuthGuard] },
    { path: 'leavetype', component: LeavetypeComponent, canActivate:[AuthGuard] },
    { path: 'leavetype/:id', component: EditLeavetypeComponent, canActivate:[AuthGuard] },
    { path: 'leavetype', component: LeavetypeListComponent, canActivate:[AuthGuard] },
    { path: 'subject', component: SubjectComponent, canActivate:[AuthGuard] },
    { path: 'subject/:id', component: EditSubComponent, canActivate:[AuthGuard] },
    { path: 'subject', component: SubListComponent, canActivate:[AuthGuard] },
    { path: 'exam', component: ExamComponent, canActivate:[AuthGuard] },
    { path: 'exam/:id', component: EditExamComponent, canActivate:[AuthGuard] },
    { path: 'exam', component: ExamListComponent, canActivate:[AuthGuard] },
     
    // { path: 'emp/:id', component: EditExamComponent, canActivate:[AuthGuard] },
    { path: 'teachinfo', loadChildren:() => import('./teacherinfo/teacherinfo.module').then(m => m.TeacherinfoModule) },
    // { path: 'teachinfo', component: TeacherinfoComponent, canActivate:[AuthGuard] },
    { path: 'marktotal', component: TotalmarksComponent, canActivate:[AuthGuard] },
    { path: 'marktotal/:id', component: EditTotalmarksComponent, canActivate:[AuthGuard] },    
    { path: 'totalmarkdtl/:id', component: EditTotalmarksComponent, canActivate:[AuthGuard] },
    { path: 'group', component: GroupsComponent, canActivate:[AuthGuard] },
    { path: 'group/:id', component: EditGroupsComponent, canActivate:[AuthGuard] },
    { path: 'feecollect', component: FeecollectComponent, canActivate:[AuthGuard] },
    { path: 'classfee', component: ClassfeeComponent, canActivate:[AuthGuard] },
    { path: 'spfee', component: SpfeeComponent, canActivate:[AuthGuard] },
    { path: 'sections', component: SectionsComponent, canActivate:[AuthGuard] },
    { path: 'sections/:id', component: EditSectionsComponent, canActivate:[AuthGuard] },
    { path: 'groupchange', component: GroupchangeComponent, canActivate:[AuthGuard] },
    { path: 'promotion', component: PromotionComponent, canActivate:[AuthGuard] },
    { path: 'lschool', component: LschoolComponent, canActivate:[AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
    { path: 'markssheet', component: MarkssheetComponent, canActivate:[AuthGuard]},
    { path: 'login', component: LoginComponent},      
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
