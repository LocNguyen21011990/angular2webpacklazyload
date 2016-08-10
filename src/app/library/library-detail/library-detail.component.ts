import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'library-detail',
  providers: [  ],
  directives: [],
  templateUrl: './library-detail.component.jade',
})
export class LibraryDetailComponent {
  private _paramSub: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this._paramSub = this.activatedRoute.params.subscribe(p => {
      console.log(p);
    });
  }

  ngOnDestroy() {
    if (this._paramSub) {
      this._paramSub.unsubscribe();
    }
  }
}
