import { Component } from '@angular/core';
import { AuthorRepository } from './../author/author-repository.service.ts';

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
    private authorRepo: AuthorRepository
  ) {}

  ngOnInit() {
    this.authorList = this.authorRepo.getList()
  }
}
