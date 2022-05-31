import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/data/schema/logged-user';
import { User } from 'src/app/data/schema/user';
import { AuthService } from 'src/app/data/services/auth.service';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  IdNom!: string;
  isLoadingUsers: boolean = true;

  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (users) => {
        this.users = users;
        this.isLoadingUsers = false;
      },
      (error) => {
        console.log('Error fetching!', error);
      }
    );

    this.authService.loggedUser$.subscribe((loggedUser) => {
      if (loggedUser?.roles.includes(Role.Admin)) {
        this.isAdmin = true;
      } else this.isAdmin = false;
    });
  }

  onWrite() {
    // console.log(this.IdNom);
    // this.users = this.userService
    //   .getAll()
    //   .filter((user) => user.robotName.toLowerCase().includes(this.IdNom));
    // console.log(this.users);
    ///////////////////////////////////////////////////////////////////////////////////////////
    // return this.users.map((users) => {
    //   let fl = users.filter((user) =>
    //     user.robotName.toLowerCase().includes(this.IdNom)
    //   );
    //   return fl.length > 0 ? fl[0] : null;
    // });
    //////////////////////////////////////////////////////////////////////////

    this.users = this.users.filter((res) =>
      res.robotName.toLowerCase().includes(this.IdNom)
    );
    this.userService.getAll().subscribe();

    // this.userService.getAll().subscribe((res) => {
    //   if ((res.length = 0)) {
    //     console.log('empty');
    //   }
    // });

    this.userService.getAll().subscribe((res) => {
      if (this.IdNom.toLowerCase() == 'back') {
        var path = '/users';
        window.location.href = path;
      } else {
        this.users = this.users.filter((res) =>
          res.robotName.toLowerCase().includes(this.IdNom)
        );
      }

      // if (this.users.length == 0) {
      //   var path = '/users';
      //   window.location.href = path;
      // }
    });

    // this.userService.getAll().subscribe((res) => {
    //   console.log(res);
    // });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this Robot ?')) {
      this.users = this.users.filter((user) => user.id !== id);
      this.userService.deleteUser(id).subscribe();
    }
  }
}
