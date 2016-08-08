import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
})
export class App {
  private dataSub

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSub = this.route.data.subscribe(data => {
      console.log(data);
    });
    this.router.events.filter(ev => ev instanceof NavigationEnd)
      .subscribe(_ => {
        console.log(this.route.snapshot)
        console.log(this.router.routerState.snapshot);

      })
  }

  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
  }
}
