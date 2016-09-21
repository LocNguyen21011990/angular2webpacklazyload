import { NgModule } from '@angular/core';
import { BookApi } from './book-api';
import { CoreModule } from 'app/core';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CoreModule,
    HttpModule,
  ],
  providers: [
    BookApi,
  ],
})
export class ApiModule {}
