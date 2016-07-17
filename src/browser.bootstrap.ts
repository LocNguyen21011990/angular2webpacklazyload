import { provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { App } from './app/app.component.ts';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppRoutesProvider } from './app/app.routes.ts';

export function main() {
  bootstrap(App, [
      provide(PLATFORM_DIRECTIVES, { useValue: ROUTER_DIRECTIVES, multi: true }),
      AppRoutesProvider,
    ])
    .catch(error => {
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', () => main());
