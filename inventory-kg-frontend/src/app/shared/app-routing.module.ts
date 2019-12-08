import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {GroupComponent} from '../components/group/group.component';


const routes: Routes = [
  {path:'',redirectTo:'groups',pathMatch:"full"},
  {path:'groups',component:DashboardComponent},
  {path:'groups/:groupid',component:GroupComponent},
  {path:'login',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
