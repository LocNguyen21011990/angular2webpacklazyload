import { Injectable, Injector } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable()
export class BookApi extends BaseApi {
  protected endpoint = '/book';

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  list(params: {
    start: number,
    limit: number,
  }) {
    return this.get('?start?limit', params);
  }
}
