import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// console.log(require('pug-html!./login.jade'));

/**
 * Login
 */
@Component({
  templateUrl: './login.jade',
  styleUrls: ['./login.scss'],
})
export class Login {
  private form: FormGroup;
  private isSubmitted: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [ undefined, Validators.required ],
      password: [ undefined, Validators.required ],
    });
  }

  handleFormSubmit() {
    this.isSubmitted = true;
    if (!this.form.valid) {
      return;
    }

    let { username, password } = this.form.value;
    if (username === password) {
      this.router.navigate(['/']);
    }
  }
}
