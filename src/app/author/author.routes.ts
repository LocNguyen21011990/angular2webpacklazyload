import { RouterConfig } from '@angular/router';
import { AuthorList } from './author-list/author-list.component.ts';

export const AuthorRoutes: RouterConfig = [{
  path: 'author',
  component: AuthorList,
}];
