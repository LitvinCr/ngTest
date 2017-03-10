"use strict";
var index_1 = require('./guards/index');
var signin_component_1 = require('./components/signin/signin.component');
var signup_component_1 = require("./components/signup/signup.component");
var home_component_1 = require("./components/home/home.component");
var notfound_component_1 = require('./components/notfound/notfound.component');
exports.appRoutes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: signin_component_1.SigninComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        canActivate: [index_1.AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: 'app/components/home/dashboard/dashboard.module#DashboardModule' },
            { path: 'users', loadChildren: 'app/components/home/users/users.module#UsersModule' }
        ]
    },
    { path: '**', component: notfound_component_1.NotFoundComponent }
];
