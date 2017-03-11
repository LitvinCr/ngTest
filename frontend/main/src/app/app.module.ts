import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Http, HttpModule, RequestOptions, JsonpModule } from '@angular/http';

import { appRoutes } from "./app.routes";
import { RouterModule } from "@angular/router";

import { AuthGuard, AdminGuard } from './guards/index';
import { AuthenticationService, UserService, MoviesService } from './services/index';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/notfound/notfound.component';

import { MoviesListComponent, MoviesDetailComponent } from './components/home/movies';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    NotFoundComponent,
    MoviesListComponent,
    MoviesDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthenticationService,
    UserService,
    MoviesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
