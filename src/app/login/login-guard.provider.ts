import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Session } from 'app/core';

@Injectable()
export class EnsureAnonymous implements CanActivate {
  constructor(
    private session: Session
  ) {}

  canActivate() {
    let _canActivate = !this.session.token;

    return _canActivate;
  }
}
