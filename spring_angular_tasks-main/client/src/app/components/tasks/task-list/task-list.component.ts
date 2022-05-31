import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/data/services/task.service';
import { Task } from 'src/app/data/schema/task';
import { User } from 'src/app/data/schema/user';
import { AuthService } from 'src/app/data/services/auth.service';
import { Role } from 'src/app/data/schema/logged-user';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  currentUser!: User;
  showTasks: boolean = false;

  tasks: Task[] = [];
  isLoadingTasks: boolean = false;
  errorMessage?: string;

  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe((loggedUser) => {
      if (loggedUser?.roles.includes(Role.Admin)) {
        this.isAdmin = true;
      } else this.isAdmin = false;
    });
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.showTasks = true;
    this.isLoadingTasks = true;
    this.taskService.getAll(this.currentUser.id).subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.isLoadingTasks = false;
      },
      (error) => {
        console.log('Error fetching!', error);
        this.isLoadingTasks = false;
        this.errorMessage =
          error?.error?.message || 'Whoops! An unexpected error has occured!';
      }
    );
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.taskService.deleteTask(id).subscribe();
  }

  addTask(newTask: Task): void {
    this.taskService.addTask(newTask).subscribe((task) => {
      this.tasks.push(task);
    });
  }
}
