import { Routes, RouterModule }  from '@angular/router';

import { UsersListComponent, UsersDetailComponent } from './index';
import { ModuleWithProviders } from '@angular/core';


// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  { path: '', component: UsersListComponent},
  { path: ':id', component: UsersDetailComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
