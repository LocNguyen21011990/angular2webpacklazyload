import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { App } from './app.component';
import { routeModule } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    routeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    App,
  ],
  bootstrap: [
    App,
  ],
})
export class AppModule {}
