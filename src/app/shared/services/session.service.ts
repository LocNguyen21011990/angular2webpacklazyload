import { Injectable } from '@angular/core';
import { storage } from '../lib/storage';

interface SessionData {
  preference: {};
  user: {
    login: string,
    email?: string,
    profile: {},
  };
  token: string;
}

@Injectable()
export class Session {
  private storageKey = 'CravenStorageKey';
  private sessionData: SessionData;

  constructor() {
    this.init();
  }

  /**
   * update session data with new value
   */
  refreshSession(data) {
    this.sessionData = data;
    storage.set(this.storageKey, data);
  }

  clearSession() {
    storage.remove(this.storageKey);
    this.sessionData = {} as SessionData;
  }

  private init() {
    this.sessionData = storage.get(this.storageKey) || {};
  }

  get user() {
    return this.sessionData.user;
  }

  get valid(): boolean {
    return !!this.token;
  }

  get token() {
    return this.sessionData.token;
  }
}
