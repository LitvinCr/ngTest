import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersListComponent, UsersDetailComponent } from './index';
import { routing }       from './users.routing';

import { UserRolePipe } from '../../../pipes/user-role.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    UsersListComponent,
    UsersDetailComponent,
    UserRolePipe
  ],
  providers: [
  ]
})
export class UsersModule {}
