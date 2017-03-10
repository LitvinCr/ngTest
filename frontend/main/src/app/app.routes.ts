import {Routes} from '@angular/router';
import { AuthGuard } from './guards/index';

import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from "./components/signup/signup.component";
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from './components/notfound/notfound.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/components/home/dashboard/dashboard.module#DashboardModule' },
      { path: 'users', loadChildren: 'app/components/home/users/users.module#UsersModule' }
    ]
  },
  {path: '**', component: NotFoundComponent}
];
