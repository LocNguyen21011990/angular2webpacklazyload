import './styles/core.scss';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app';

platformBrowserDynamic().bootstrapModule(AppModule)

/*
import { provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {
  disableDeprecatedForms,
  provideForms,
  REACTIVE_FORM_DIRECTIVES,
} from '@angular/forms';
import { App } from './app/app.component.ts';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppRoutesProvider } from './app/app.routes.ts';

export function main() {
  bootstrap(App, [
    disableDeprecatedForms(),
    provideForms(),
    provide(PLATFORM_DIRECTIVES, { useValue: ROUTER_DIRECTIVES, multi: true }),
    provide(PLATFORM_DIRECTIVES, { useValue: REACTIVE_FORM_DIRECTIVES, multi: true }),
    AppRoutesProvider,
  ])
  .catch(error => {
    console.error(error);
  });
}

document.addEventListener('DOMContentLoaded', () => main());
*/
