import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Users } from './list/users.component';
import { UsersDetail } from './detail/detail.component';
import { routing }       from './users.routing';

import { UserRolePipe } from '../../../pipes/user-role.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    Users,
    UsersDetail,
    UserRolePipe
  ],
  providers: [
  ]
})
export class UsersModule {}
