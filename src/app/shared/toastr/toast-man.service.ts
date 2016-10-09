import { Injectable } from '@angular/core';

interface Toast {
  title: string;
  body: string;
  timeout: number;
  type: string;
}

@Injectable()
export class ToastMan {
  toasts = [] as Array<Toast>;

  show(title, body, timealive, type = 'default') {
    let toast = {
      type,
      title,
      body,
      timeout: setTimeout(() => this.toasts = this.toasts.filter(t => t !== toast), timealive),
    } as Toast;

    this.toasts  = [...this.toasts, toast];
  }
}
