import { RouterModule, Routes } from '@angular/router';
import { LibraryHomeComponent } from './library-home/library-home.component';
import { LibraryComponent } from './library.component';
import { LibraryDetailComponent } from './library-detail/library-detail.component';

declare const System: any;

const LibraryRoute: Routes = [{
  path: '',
  component: LibraryComponent,
  children: [{
    path: '',
    component: LibraryHomeComponent,
  }, {
    path: ':id',
    component: LibraryDetailComponent,
  }],
}];

export const LibraryRoutingModule = RouterModule.forChild(LibraryRoute);
