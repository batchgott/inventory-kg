import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {GroupComponent} from '../components/group/group.component';
import {AuthGuard} from './auth-guard';


const routes: Routes = [
  {path:'',redirectTo:'groups',pathMatch:"full"},
  {path:'groups',canActivate:[AuthGuard],children:[
      {path:"",component:DashboardComponent},
      {path:':groupid',component:GroupComponent,}
    ]},
  {path:'login',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
