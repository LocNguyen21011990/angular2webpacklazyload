import { Component } from '@angular/core';
import { AuthorRepository } from 'app/author/author-repository.service';

@Component({
  selector: 'global-header',
  templateUrl: './global-header.component.jade',
  styleUrls: ['./global-header.component.scss'],
})
export class GlobalHeader {
  private authorList;

  constructor(
    private authorRepository: AuthorRepository,
  ) {}

  ngOnInit() {
    this.authorList = this.authorRepository.getList();
  }
}
