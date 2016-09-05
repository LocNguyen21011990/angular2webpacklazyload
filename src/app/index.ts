import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { AsyncNgModuleLoader } from './shared/providers/async-module-loader';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { App } from './app.component';
import { routeModule } from './app.routes';
import { Login } from './login/login.component';
import { Home } from './home/home.component';
import { AuthorList } from './author/author-list/author-list.component';
import { MainWrapper } from './main-wrapper/main-wrapper.component';
import { ObjectIterablePipe } from './shared/pipe/object-iterable.pipe';
import { DynamicContent } from './shared/dynamic-content/dynamic-content.directive';

@NgModule({
  imports: [
    BrowserModule,
    routeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    App,
    Login,
    Home,
    AuthorList,
    MainWrapper,
    ObjectIterablePipe,
    DynamicContent,
  ],
  bootstrap: [
    App,
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: AsyncNgModuleLoader },
  ],
})
export class AppModule {}
