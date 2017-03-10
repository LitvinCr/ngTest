import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(params:any): Observable<boolean> {
    return this.http.post('http://localhost:4010/api/v1/signin/basic', params)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let payload = response.json() && response.json().payload;
        let token = payload.token;

        if (token) {
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({email: params.email, token: token, role: payload.role}));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  signup(params: any): Observable<boolean> {
    return this.http.post('http://localhost:4010/api/v1/signup/basic', params)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let payload = response.json() && response.json().payload;
        let token = payload.token;

        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({email: params.email, token: token, role: payload.role}));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  loggedIn(): boolean {
    return !!this.token;
  }

  isAdmin(): boolean {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return currentUser.role === 2;
  }
}
