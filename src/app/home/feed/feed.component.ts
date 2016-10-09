import { Component } from '@angular/core';
import { ToastMan } from 'app/toastr';

/**
 * Home
 */
@Component({
  templateUrl: './feed.jade',
  styleUrls: ['./feed.scss'],
})
export class Feed {
  public title = 'This is our home';

  public content = `
    <div>
      <h2>Fancy content</h2>
      All platform directive can be used here

      <div>The time is {{ currentTime | date: 'mediumTime' }}  </div>
      <button>This button is cool</button>
    </div>
  `;

  public contentLocal = {
    currentTime: new Date(),
  };

  constructor(
    private toastr: ToastMan,
  ) {}

  test() {
    this.toastr.show('Atoast', 'This is a test toast', 10000, 'error');
  }
}
