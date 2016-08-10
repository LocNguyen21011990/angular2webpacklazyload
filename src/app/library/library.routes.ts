import { RouterModule, Routes } from '@angular/router';
import { LibraryHomeComponent } from './library-home/library-home.component';
import { LibraryComponent } from './library.component';
import { asyncWrap } from './../shared/providers/async-module-loader';

declare const System: any;

const LibraryRoute: Routes = [{
  path: '',
  component: LibraryComponent,
  children: [{
    path: '',
    component: LibraryHomeComponent,
  }, {
    path: ':id',
    loadChildren: asyncWrap(() => System.import('./library-detail').then(r => r.LibraryDetailModule)),
  }],
}];

export const libraryRouteProvider = RouterModule.forChild(LibraryRoute);
