import { Routes, RouterModule } from '@angular/router';
import { AuthorRoutes } from './author/author.routes';
import { HomeRoutes } from './home/home.routes';
import { Login } from './login/login.component';
import { MainWrapper } from './main-wrapper/main-wrapper.component';
import { asyncWrap } from './shared/providers/async-module-loader';

declare const System: any;

export const AppRoutes: Routes = [
  {
    path: '',
    component: MainWrapper,
    children: [
      ...HomeRoutes,
      ...AuthorRoutes,
      {
        path: 'library',
        loadChildren: asyncWrap(() => System.import('./library').then(r => r.LibraryModule)),
      },
    ],
  }, {
    path: 'login',
    component: Login,
  },
];

export const routeModule = RouterModule.forRoot(AppRoutes);
