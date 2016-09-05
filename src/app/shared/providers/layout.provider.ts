/**
 * Layout stuff
 */
import { Injectable } from '@angular/core';

/**
 * LayoutProvider
 */
@Injectable()
class LayoutProvider {
  private _data = {};

  get(key: string) {
    return this._data[key];
  }

  set(key: string, value) {
    this._data[key] = value;
  }
}
