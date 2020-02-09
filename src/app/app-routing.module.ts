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


const routes: Routes = [
    { path: 'bp', component: BpComponent },
    { path: 'bp/:id', component: EditBpComponent },
    { path: 'bp', component: BpListComponent },
    { path: 'cast', component: CastComponent },
    { path: 'cast/:id', component: EditCastComponent },
    { path: 'cast', component: CastListComponent },
    { path: 'classes', component: ClassesComponent },
    { path: 'classes/:id', component: EditClassComponent },
    { path: 'classes', component: ClassesListComponent },
    { path: 'dept', component: DeptComponent },
    { path: 'dept/:id', component: EditDeptComponent },
    { path: 'dept', component: DeptListComponent },
    { path: 'edu', component: EduComponent },
    { path: 'edu/:id', component: EditEduComponent },
    { path: 'edu', component: EduListComponent },
    { path: 'feetype', component: FeetypeComponent },
    { path: 'feetype/:id', component: EditFeetypeComponent },
    { path: 'feetype', component: FeetypeListComponent },
    { path: 'leavetype', component: LeavetypeComponent },
    { path: 'leavetype/:id', component: EditLeavetypeComponent },
    { path: 'leavetype', component: LeavetypeListComponent },
    { path: 'subject', component: SubjectComponent },
    { path: 'subject/:id', component: EditSubComponent },
    { path: 'subject', component: SubListComponent },
    { path: '**', component: PageNotFoundComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
