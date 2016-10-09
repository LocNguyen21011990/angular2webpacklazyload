import { NgModule } from '@angular/core';
import { BookApi } from './book-api';
import { SharedModule } from 'app/shared';
import { HttpModule } from '@angular/http';
import { AuthApi } from './auth.api';

@NgModule({
  imports: [
    SharedModule,
    HttpModule,
  ],
  providers: [
    BookApi,
    AuthApi,
  ],
})
export class ApiModule {}
