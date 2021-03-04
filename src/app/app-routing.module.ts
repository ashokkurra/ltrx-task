import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskLoginComponent } from "./components/task-login/task-login.component";
import { TaskSignupComponent } from "./components/task-signup/task-signup.component";
import { TaskDashboardComponent } from "./components/task-dashboard/task-dashboard.component";
import { TaskLoginAuthGuard } from "./services/gaurds/taskloginauthguard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: TaskLoginComponent
  },
  {
    path: 'signup',
    component: TaskSignupComponent
  },
  { 
    path: 'dashboard', 
    // canActivate: [TaskLoginAuthGuard], 
    component: TaskDashboardComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
