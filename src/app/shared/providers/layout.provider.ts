/**
 * Layout stuff
 */
import { Injectable } from '@angular/core';

/**
 * LayoutProvider
 */
class LayoutProvider {
  private _data = {};

  get(key: string) {
    return this._data[key];
  }

  set(key: string, value) {
    this._data[key] = value;
  }
}
