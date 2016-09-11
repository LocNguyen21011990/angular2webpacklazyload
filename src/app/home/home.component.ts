import { Component } from '@angular/core';

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
}
