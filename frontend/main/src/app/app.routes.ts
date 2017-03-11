import {Routes} from '@angular/router';
import { AuthGuard, AdminGuard } from './guards/index';

import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from "./components/signup/signup.component";
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from './components/notfound/notfound.component';

import { MoviesListComponent, MoviesDetailComponent } from './components/home/movies';

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
      {
        path: 'users',
        loadChildren: 'app/components/home/users/users.module#UsersModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'movies',
        component: MoviesListComponent,
      },
      {
        path: 'movies/:id',
        component: MoviesDetailComponent,
      }
    ]
  },
  {path: '**', component: NotFoundComponent}
];
