import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMan } from './toast-man.service';
import { ToastContainer } from './toast-container.component';

@NgModule({
  imports: [
    CommonModule,
  ],

  providers: [
    ToastMan,
  ],

  declarations: [
    ToastContainer,
  ],

  exports: [
    ToastContainer,
  ],
})
export class ToastrModule {}
