import { Component } from '@angular/core';
import { ToastMan } from 'app/shared/toastr';

/**
 * Home
 */
@Component({
  templateUrl: './home.jade',
  styleUrls: ['./home.scss'],
})
export class Home {
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
