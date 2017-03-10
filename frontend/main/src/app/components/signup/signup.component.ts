import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../../theme/validators';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/index';


@Component({
  selector: 'register',
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.scss']
})

export class SignupComponent implements OnInit {
  model: any = {};
  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public confirmPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  constructor(fb:FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],

      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'confirmPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.confirmPassword = this.passwords.controls['confirmPassword'];
  }

  public onSubmit(values):void {
    this.submitted = true;

    if (this.form.valid) {
      values.password = values.passwords.password;
      values.confirmPassword = values.passwords.confirmPassword;

      this.authenticationService.signup(values)
        .subscribe(result => {
          if (result === true) {
            this.router.navigate(['/home/dashboard']);
          }
        });
    }
  }

  ngOnInit() {
  }
}
