import {Component, OnInit} from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../../models/index';
import { UserService } from '../../../../services/index';

import 'style-loader!./users.scss';

@Component({
  selector: 'users',
  styleUrls: ['./users.scss'],
  templateUrl: './users.html'
})
export class Users implements OnInit {
  users: User[] = [];

  query: string = '';
  source: LocalDataSource = new LocalDataSource();

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      name: {
        title: 'Name',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      },
      birthday: {
        title: 'Birthday',
        type: 'number'
      }
    }
  };



  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;

        this.source.load(this.users);
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
