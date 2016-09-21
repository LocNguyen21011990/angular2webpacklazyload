import { Injectable } from '@angular/core';

@Injectable()
export class Session {
  private _sessionData = {
    token: 'adsfasdfasfdasdf',
  };

  constructor() {
    console.log('init');
  }

  get token() {
    return this._sessionData.token;
  }
}
