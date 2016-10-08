import { Directive, Input, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[col]',
})
export class GridCol {
  @Input('col') width;

  constructor(
    private elmRef: ElementRef,
    private renderer: Renderer,
  ) {
  }

  ngOnInit() {
    let elm = this.elmRef.nativeElement;
    this.renderer.setElementClass(elm, 'col', true);
    this.renderer.setElementStyle(elm, 'width', `${this.width}%`);
  }
}
