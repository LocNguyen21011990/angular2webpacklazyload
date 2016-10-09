import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthApi {
  authorize(username, password) {
    let issueAt = Date.now();
    let token = btoa(JSON.stringify({
      username,
      password,
      issueAt,
    }));

    return Observable.of({
      token,
      username,
      issueAt,
    }).timeout(5000);
  }
}
