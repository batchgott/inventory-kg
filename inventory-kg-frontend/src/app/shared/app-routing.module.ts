import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {GroupComponent} from '../components/group/group.component';
import {AuthGuard} from './auth-guard';
import {UserManagementComponent} from '../components/user-management/user-management.component';
import {AdminAuthGuard} from './admin-auth-guard';
import {AddUserComponent} from '../components/user-management/add-user/add-user.component';
import {ChangeUserComponent} from '../components/user-management/change-user/change-user.component';
import {GroupManagementComponent} from '../components/group-management/group-management.component';
import {AddGroupComponent} from '../components/group-management/add-group/add-group.component';
import {ChangeGroupComponent} from '../components/group-management/change-group/change-group.component';


const routes: Routes = [
  {path:'',redirectTo:'groups',pathMatch:"full"},
  {path:'groups',canActivate:[AuthGuard],children:[
      {path:"",component:DashboardComponent},
      {path:':groupid',component:GroupComponent,}
    ]},
  {path:'user-management',canActivate:[AdminAuthGuard],children:[
      {path: "",component: UserManagementComponent},
      {path: "new",component: AddUserComponent},
      {path: ":userid",component: ChangeUserComponent}
    ]},
  {path:'group-management',canActivate:[AdminAuthGuard],children:[
      {path: "",component: GroupManagementComponent},
      {path: "new",component: AddGroupComponent},
      {path: ":groupid",component: ChangeGroupComponent}
    ]},
  {path:'login',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
