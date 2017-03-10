import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    if ( user.role === 2 ) {
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/home/dashboard']);
    return false;
  }
}
