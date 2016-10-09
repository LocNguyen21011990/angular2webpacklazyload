import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorRepository } from './../author-repository.service';
import { Gender } from './../enums';

/**
 * AuthorList
 */
@Component({
  templateUrl: './author-list.jade',
})
export class AuthorList {
  private routeParamSub;
  private params: any;
  private isRandom: boolean;
  private authorList;

  constructor(
    private route: ActivatedRoute,
    private authorRepo: AuthorRepository,
  ) {}

  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe(p => {
      this.params = p;

      if (!p['id']) {
        this.isRandom = true;
      } else {
        this.isRandom = false;
      }
    });

    this.authorList = this.authorRepo.getByGender(Gender.Male);
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }
}
