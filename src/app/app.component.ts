import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
})
export class App {
  private a: Array<string> = [];

  constructor(
    private router: Router
  ) {
    this.a.filter(it => {
      return !it.match(/asdf/g);
    });
  }

  ngOnInit() {
    let a = new Promise((resolve, reject) => {
      resolve('asdf');
    });

    a.then();
  }
}
