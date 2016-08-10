import { RouterModule, Routes } from '@angular/router';
import { LibraryHomeComponent } from './library-home/library-home.component';
import { LibraryComponent } from './library.component';

declare const System: any;

const LibraryRoute: Routes = [{
  path: '',
  component: LibraryComponent,
  children: [{
    path: '',
    component: LibraryHomeComponent,
  }, {
    path: ':id',
    loadChildren: System.import('./library-detail').then(m => m.LibraryDetailModule),
  }],
}];

export const libraryRouteProvider = RouterModule.forChild(LibraryRoute);
