import {Component, OnInit} from '@angular/core';
import {  ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/index';
import { UserService } from '../../../../services/index';

@Component({
  selector: 'detail',
  styleUrls: ['./detail.scss'],
  templateUrl: './detail.html'
})
export class UsersDetail implements OnInit {
  userDetail = {};

  constructor(private userService: UserService,  private route: ActivatedRoute) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];

    this.userService.getOne(id)
      .subscribe(user => {
        this.userDetail = user;
      });
  }

}
