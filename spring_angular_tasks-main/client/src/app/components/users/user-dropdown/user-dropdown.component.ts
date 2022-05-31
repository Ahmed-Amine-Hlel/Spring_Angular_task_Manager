import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/data/schema/user';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css'],
})
export class UserDropdownComponent implements OnInit {
  @Output() setCurrentUser: EventEmitter<User> = new EventEmitter();

  defaultOptionText: string = 'Loading robots...';
  users: User[] = [];
  isLoadingUsers: boolean = true;
  currentUser?: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (users) => {
        if (users.length > 0) {
          this.defaultOptionText =
            'Choose a Robot and list their tasks to see what they can do !';
          this.users = users;
        } else {
          this.defaultOptionText = 'No robots yet, add robots from navbar!';
        }
      },
      (error) => {
        this.defaultOptionText = 'Error fetching robots!';
        console.log(error);
      }
    );
  }

  onUserChange(user: User) {
    this.setCurrentUser.emit(user);
  }
}
