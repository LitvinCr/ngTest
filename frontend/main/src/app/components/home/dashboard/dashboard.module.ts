import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    Dashboard
  ],
  providers: [
  ]
})
export class DashboardModule {}
