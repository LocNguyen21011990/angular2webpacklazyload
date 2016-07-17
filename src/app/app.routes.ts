import { provideRouter, RouterConfig } from '@angular/router';
import { AuthorRoutes } from './author/author.routes.ts';
import { HomeRoutes } from './home/home.routes.ts';

export const AppRoutes: RouterConfig = [{
  path: '',
  children: [
    ...HomeRoutes,
    ...AuthorRoutes,
  ],
}];

export const AppRoutesProvider = provideRouter(AppRoutes);
