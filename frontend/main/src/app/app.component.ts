import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private  authenticationService: AuthenticationService) {

  }

  ngOnInit() {

  }
}
