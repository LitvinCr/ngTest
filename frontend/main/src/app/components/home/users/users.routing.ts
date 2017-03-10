import { Routes, RouterModule }  from '@angular/router';

import { Users } from './list/users.component';
import { UsersDetail } from './detail/detail.component';
import { ModuleWithProviders } from '@angular/core';


// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  { path: '', component: Users},
  { path: ':id', component: UsersDetail }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
