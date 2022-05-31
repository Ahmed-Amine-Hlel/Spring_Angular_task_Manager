import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LoggedUser, Role } from 'src/app/data/schema/logged-user';
import { Task } from 'src/app/data/schema/task';
import { AuthService } from 'src/app/data/services/auth.service';
import { TaskService } from 'src/app/data/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  // task cannot be null here, since it comes from an input
  @Input() task!: Task;
  @Output() deleteTask: EventEmitter<number> = new EventEmitter<number>();

  isAdmin: boolean = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe((loggedUser) => {
      if (loggedUser?.roles.includes(Role.Admin)) {
        this.isAdmin = true;
      } else this.isAdmin = false;
    });
  }

  setClasses(): Object {
    return {
      row: true,
      task: true,
      'is-complete': this.task.completed,
    };
  }

  // onToggle(task: Task): void {
  //   // Toggel in UI
  //   task.completed = !task.completed;
  //   // Toggle in Server
  //   this.taskService.toggleCompleted(task).subscribe();
  // }

  onDelete(id: number): void {
    this.deleteTask.emit(id);
  }
}
