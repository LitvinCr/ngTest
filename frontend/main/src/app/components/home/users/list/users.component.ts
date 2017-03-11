import {Component, OnInit} from '@angular/core';

import { User } from '../../../../models/index';
import { UserService } from '../../../../services/index';

import 'style-loader!./users.scss';

@Component({
  selector: 'users',
  styleUrls: ['./users.scss'],
  templateUrl: './users.html'
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

}
