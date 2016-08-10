import { RouterModule, Routes } from '@angular/router';
import { LibraryHomeComponent } from './library-home/library-home.component';
import { LibraryComponent } from './library.component';

const LibraryRoute: Routes = [{
  path: '',
  component: LibraryComponent,
  children: [{
    path: '',
    component: LibraryHomeComponent,
  }],
}];

export const libraryRouteProvider = RouterModule.forChild(LibraryRoute);
