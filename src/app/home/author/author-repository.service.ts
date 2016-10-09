import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Gender } from './enums';

@Injectable()
export class AuthorRepository {
  private list = [
    { id: 'murakami-h', name: 'Haruki Murakami', gender: Gender.Male },
    { id: 'hermingway', name: 'E. Hermingway', gender: Gender.Male },
    { id: 'carl-j', name: 'Carl Jung', gender: Gender.Male },
    { id: 'jk-rowling', name: 'JK. Rowling', gender: Gender.Female },
  ];
  constructor() {

  }

  getList(): Observable<Array<Author>> {
    return Observable.of(this.list);
  }

  getByGender(g: Gender) {
    let list = this.list.filter(t => t.gender === g);
    return Observable.of(list);
  }
}
