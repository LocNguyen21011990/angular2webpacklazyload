import { NgModule } from '@angular/core';
import { LibraryComponent } from './library.component';
import { libraryRouteProvider } from './library.routes';
import { LibraryHomeComponent } from './library-home/library-home.component';

@NgModule({
  declarations: [
    LibraryComponent,
    LibraryHomeComponent,
  ],
  imports: [
    libraryRouteProvider,
  ],
  providers: [],
})
export class LibraryModule {}
