import { provideRouter, Routes, RouterModule } from '@angular/router';
import { AuthorRoutes } from './author/author.routes.ts';
import { HomeRoutes } from './home/home.routes.ts';
import { Login } from './login/login.component.ts';
import { MainWrapper } from './main-wrapper/main-wrapper.component.ts';

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
        loadChildren: System.import('./library').then(r => r.LibraryModule),
      },
    ],
  }, {
    path: 'login',
    component: Login,
  },
];

export const AppRoutesProvider = provideRouter(AppRoutes);
export const routeModule = RouterModule.forRoot(AppRoutes);
