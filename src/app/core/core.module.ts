import { NgModule, ModuleWithProviders } from '@angular/core';
import { Session } from './session.provider';

@NgModule({})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        Session,
      ],
    };
  }
}
