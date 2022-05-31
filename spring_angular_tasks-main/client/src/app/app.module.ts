import { NgModule, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
// import { MatInputHarness } from '@angular/material/input/testing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { TaskItemComponent } from './components/tasks/task-item/task-item.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserItemComponent } from './components/users/user-item/user-item.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';

import { UserDropdownComponent } from './components/users/user-dropdown/user-dropdown.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './shared/shared.module';
import { HttpAuthInterceptor } from './core/interceptors/http-auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskItemComponent,
    TaskListComponent,
    UserListComponent,
    UserItemComponent,
    UserFormComponent,
    AddTaskComponent,
    UserDropdownComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MatInputModule,
    // MatInputHarness,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      // ErrorStateMatcher,
      useClass: HttpAuthInterceptor,
      // ShowOnDirtyErrorStateMatcher,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
