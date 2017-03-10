"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var SigninComponent = (function () {
    function SigninComponent(fb, router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.model = {};
        this.submitted = false;
        this.form = fb.group({
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            'password': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }
    SigninComponent.prototype.onSubmit = function (values) {
        var _this = this;
        this.submitted = true;
        if (this.form.valid) {
            this.authenticationService.login(values)
                .subscribe(function (result) {
                if (result === true) {
                    _this.router.navigate(['/home/dashboard']);
                }
            }, function (err) {
            });
        }
    };
    SigninComponent.prototype.ngOnInit = function () {
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './signin.component.html',
            styleUrls: ['signin.component.scss']
        })
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
