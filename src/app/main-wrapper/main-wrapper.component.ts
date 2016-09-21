import { Component } from '@angular/core';
import { AuthorRepository } from './../author/author-repository.service';
import { Session } from 'app/core';

/**
 * MainWrapper
 */
@Component({
  templateUrl: './main-wrapper.jade',
  providers: [AuthorRepository],
})
export class MainWrapper {
  private authorList;

  constructor(
    private authorRepo: AuthorRepository,
    private session: Session,
  ) {
    console.log(this.session.token);
  }

  ngOnInit() {
    this.authorList = this.authorRepo.getList();
  }
}
