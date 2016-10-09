import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from 'app/api';
import { Session } from 'app/shared';

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
    private formBuilder: FormBuilder,
    private authApi: AuthApi,
    private session: Session,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [ undefined, Validators.required ],
      password: [ undefined, Validators.required ],
    });
  }

  handleFormSubmit() {
    if (!this.form.valid) {
      return;
    }

    let { username, password } = this.form.value;
    this.authApi.authorize(username, password)
      .do(console.log.bind(console))
      .subscribe(res => {
        const { token } = res;
        this.session.refreshSession({
          token,
          user: { login: username },
        });
        this.router.navigate(['/']);
      });
  }
}
