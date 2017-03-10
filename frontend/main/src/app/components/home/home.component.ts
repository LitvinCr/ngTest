import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/index';


import { PAGES_MENU } from './home.menu';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})


export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  public logout() {
    this.authenticationService.logout();

    this.router.navigate(['/signin']);
  }

  public isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

  ngOnInit() {

  }
}
