import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * AuthorList
 */
@Component({
  templateUrl: './author-list.jade',
})
export class AuthorList {
  private routeParamSub;
  private params: any;
  private isRandom: boolean;
  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe(p => {
      this.params = p;

      if (!p['id']) {
        this.isRandom = true;
      } else {
        this.isRandom = false;
      }
    });
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }
}
