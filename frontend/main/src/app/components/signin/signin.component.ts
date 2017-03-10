import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/index';

@Component({
  selector: 'login',
  templateUrl: './signin.component.html',
  styleUrls: ['signin.component.scss']
})

export class SigninComponent implements OnInit {
  model: any = {};

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;

    if (this.form.valid) {
      this.authenticationService.login(values)
        .subscribe(
          (result) => {
            if (result === true) {
              this.router.navigate(['/home/dashboard']);
            }
          },
          (err) => {

          });

    }
  }


  ngOnInit() {
  }

}
