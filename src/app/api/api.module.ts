import { NgModule } from '@angular/core';
import { BookApi } from './book-api';
import { SharedModule } from 'app/shared';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    SharedModule,
    HttpModule,
  ],
  providers: [
    BookApi,
  ],
})
export class ApiModule {}
