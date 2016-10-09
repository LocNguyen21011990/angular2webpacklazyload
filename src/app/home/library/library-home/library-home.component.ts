import { Component } from '@angular/core';
import { BookApi } from 'app/api';

@Component({
  selector: 'library-home',
  templateUrl: './library-home.component.jade',
})
export class LibraryHomeComponent {
  constructor(
    private bookApi: BookApi,
  ) {}

  ngOnInit() {
    const success = res => {
      console.log(res);
    };

    const error = reason => {
      console.warn(reason);
    };

    this.bookApi.list({
      start: 0,
      limit: 10,
    }).subscribe(success, error);
  }

  ngOnDestroy() {
  }
}
