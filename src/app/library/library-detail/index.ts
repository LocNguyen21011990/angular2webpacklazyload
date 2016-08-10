import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryDetailComponent } from './library-detail.component';

const RouteConfig: Routes = [
  { path: '', component: LibraryDetailComponent },
];
const routeModule = RouterModule.forChild(RouteConfig);

@NgModule({
  imports: [routeModule],
  declarations: [LibraryDetailComponent],
})
export class LibraryDetailModule {}
