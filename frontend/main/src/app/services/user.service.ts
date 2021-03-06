﻿import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import {AuthenticationService} from './index';
import {User} from '../models/index';

@Injectable()
export class UserService {
  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
  }

  getOne(id: number): Observable<User> {
    let headers = new Headers({'Authorization': this.authenticationService.token});
    let options = new RequestOptions({headers: headers});

    return this.http.get(`http://localhost:4010/api/v1/users/${id}/profile`, options)
      .map((response: Response) => response.json());
  }

  getUsers(): Observable<User[]> {

    // add authorization header with jwt token
    let headers = new Headers({'Authorization': this.authenticationService.token});
    let options = new RequestOptions({headers: headers});

    // get users from api
    return this.http.get('http://localhost:4010/api/v1/users', options)
      .map((response: Response) => response.json());
  }
}
