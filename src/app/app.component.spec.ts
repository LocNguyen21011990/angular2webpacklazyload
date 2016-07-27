import {
  it,
  inject,
  describe,
  beforeEach,
  expect,
  addProviders,
} from '@angular/core/testing';
import { App } from './app.component';
import { AppRoutesProvider } from './app.routes';

describe('App', () => {
  beforeEach(() => addProviders([
    App,
    AppRoutesProvider,
  ]));
  it ('should work', inject([App], (app: App) => {
    // Add real test here
    expect(2).toBe(1);
  }));
});
