import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Login } from './login/login.component';
import { EnsureAnonymous } from './login/login-guard.provider';
import { Home } from './home/home.component';
import { AuthGuard } from './home/auth.guard';
import { GlobalHeader } from './home/global-header/global-header.component';
import { ApiModule } from 'app/api';
import { GridModule } from 'app/grid';
import { SharedModule } from 'app/shared';
import { ToastrModule } from 'app/toastr';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    ApiModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GridModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    App,
    Login,
    Home,
    GlobalHeader,
  ],
  bootstrap: [
    App,
  ],
  providers: [
    EnsureAnonymous,
    AuthGuard,
  ],
})
export class AppModule {}
