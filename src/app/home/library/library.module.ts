import { NgModule } from '@angular/core';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryHomeComponent } from './library-home/library-home.component';

@NgModule({
  declarations: [
    LibraryComponent,
    LibraryHomeComponent,
  ],
  imports: [
    LibraryRoutingModule,
  ],
  providers: [],
})
export class LibraryModule {}
