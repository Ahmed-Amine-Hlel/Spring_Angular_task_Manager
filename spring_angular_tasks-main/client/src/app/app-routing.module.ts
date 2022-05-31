import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { AppGuard } from './core/guards/app.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { Role } from './data/schema/logged-user';

const routes: Routes = [
  { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'users', component: UserListComponent },
  {
    path: 'user/:id',
    canActivate: [AppGuard], // Handles the activation logic from the provided roles
    data: { roles: [Role.Admin] }, // Only admin can activate this route
    component: UserFormComponent,
  },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: '**', redirectTo: 'tasks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
