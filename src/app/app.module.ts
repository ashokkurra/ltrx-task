import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskLoginComponent } from './components/task-login/task-login.component';
import { TaskSignupComponent } from './components/task-signup/task-signup.component';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskInterceptor } from "./services/interceptors/task.interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    TaskLoginComponent,
    TaskSignupComponent,
    TaskDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TaskInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
