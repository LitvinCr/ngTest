import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Users } from './list/users.component';
import { UsersDetail } from './detail/detail.component';
import { routing }       from './users.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    Users,
    UsersDetail
  ],
  providers: [
  ]
})
export class UsersModule {}
