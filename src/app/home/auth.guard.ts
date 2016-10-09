import { Injectable } from '@angular/core'
import { Router, CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Session } from 'app/shared';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private session: Session,
    private router: Router,
  ) {}

  canActivate() {
    return this.isSessionValid();
  }

  canActivateChild() {
    return this.isSessionValid();
  }

  canLoad() {
    return this.isSessionValid();
  }

  private isSessionValid(): boolean {
    let ret = this.session.valid;
    if (!ret) {
      this.router.navigate(['/login']);
    }
    return ret;
  }
}
