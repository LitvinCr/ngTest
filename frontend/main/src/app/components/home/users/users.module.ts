import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { Users } from './list/users.component';
import { UsersDetail } from './detail/detail.component';
import { routing }       from './users.routing';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
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
