"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var validators_1 = require('../../../theme/validators');
var SignupComponent = (function () {
    function SignupComponent(fb, router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.model = {};
        this.submitted = false;
        this.form = fb.group({
            'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, validators_1.EmailValidator.validate])],
            'passwords': fb.group({
                'password': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
                'confirmPassword': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])]
            }, { validator: validators_1.EqualPasswordsValidator.validate('password', 'confirmPassword') })
        });
        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.passwords = this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.confirmPassword = this.passwords.controls['confirmPassword'];
    }
    SignupComponent.prototype.onSubmit = function (values) {
        var _this = this;
        this.submitted = true;
        if (this.form.valid) {
            values.password = values.passwords.password;
            values.confirmPassword = values.passwords.confirmPassword;
            this.authenticationService.signup(values)
                .subscribe(function (result) {
                if (result === true) {
                    _this.router.navigate(['/']);
                }
            });
        }
    };
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: './signup.component.html',
            styleUrls: ['signup.component.scss']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
