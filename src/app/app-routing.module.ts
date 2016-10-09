import { Routes, RouterModule } from '@angular/router';
import { Login, EnsureAnonymous } from './login';
import { Home } from './home/home.component';

declare const System: any;

export const AppRoutes: Routes = [{
  path: '',
  component: Home,
  children: [{
    path: '',
    loadChildren: () => System.import('app/home/feed').then(r => r.FeedModule),
  }, {
    path: 'library',
    loadChildren: () => System.import('app/home/library').then(r => r.LibraryModule),
  }],
}, {
  path: 'login',
  component: Login,
  canActivate: [EnsureAnonymous],
}];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes);
