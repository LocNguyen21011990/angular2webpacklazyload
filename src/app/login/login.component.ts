import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectIterablePipe } from './../shared/pipe/object-iterable.pipe.ts';

// console.log(require('pug-html!./login.jade'));

/**
 * Login
 */
@Component({
  templateUrl: './login.jade',
  // template: 'abc',
  styleUrls: ['./login.scss'],
  pipes: [ObjectIterablePipe],
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
