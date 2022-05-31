//import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/data/schema/task';
import { User } from 'src/app/data/schema/user';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  // animations: [
  //   trigger('fade', [
  //     transition('void => *', [style({ opacity: 0 }), animate(2000)]),
  //     transition('* => void', [animate(2000), style({ opacity: 0 })]),
  //   ]),
  // ],
})
export class AddTaskComponent implements OnInit {
  // Assert non null, since it comes after loading
  @Input() selectedUser?: User;
  @Output() addTask: EventEmitter<Task> = new EventEmitter<Task>();

  task: Task = {
    title: '',
    completed: false,
    userId: -1, // Initially, userId is not fetched
  };

  constructor() {}

  ngOnInit(): void {
    if (this.selectedUser?.id) this.task.userId = this.selectedUser.id;
  }

  onSubmit(): void {
    if (this.task.title === '') return;
    if (this.selectedUser?.id) this.task.userId = this.selectedUser.id;
    this.addTask.emit(this.task);
    this.task.title = '';
  }
}
