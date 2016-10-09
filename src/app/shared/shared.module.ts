import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Session } from './services/session.service';
import { ObjectIterablePipe } from './pipes/object-iterable.pipe';
import { DynamicContentDirective } from './components/dynamic-content/dynamic-content.directive';

@NgModule({
  imports: [
    CommonModule,
  ],

  declarations: [
    ObjectIterablePipe,
    DynamicContentDirective,
  ],

  exports: [
    CommonModule,
    ObjectIterablePipe,
    DynamicContentDirective,
  ],
})
export class SharedModule {

  /**
   * to ensure session init once
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        Session,
      ],
    };
  }
}
