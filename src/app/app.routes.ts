import { provideRouter, RouterConfig } from '@angular/router';
import { AuthorRoutes } from './author/author.routes.ts';
import { HomeRoutes } from './home/home.routes.ts';
import { Login } from './login/login.component.ts';
import { MainWrapper } from './main-wrapper/main-wrapper.component.ts';

export const AppRoutes: RouterConfig = [{
  path: '',
  component: MainWrapper,
  children: [
    ...HomeRoutes,
    ...AuthorRoutes,
  ],
}, {
  path: 'login',
  component: Login,
}];

export const AppRoutesProvider = provideRouter(AppRoutes);
