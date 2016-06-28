import { bootstrap } from '@angular/platform-browser-dynamic';
import { App } from './app/app.component.ts';

export function main() {
  bootstrap(App, [])
    .catch(error => {
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', () => main());
