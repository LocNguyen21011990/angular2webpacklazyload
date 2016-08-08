import { Component } from '@angular/core'

@Component({
  selector: 'user',
  providers: [  ],
  directives: [],
  templateUrl: './user.component.jade',
})
export class UserComponent {
  constructor() {

  }

  ngOnInit() {
    console.log('init async');
  }

  ngOnDestroy() {
  }
}
