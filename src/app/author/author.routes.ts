import { Routes } from '@angular/router';
import { AuthorList } from './author-list/author-list.component.ts';

export const AuthorRoutes: Routes = [{
  path: 'author',
  redirectTo: 'author/',
  pathMatch: 'full',
}, {
  path: 'author/:id',
  component: AuthorList,
}];
