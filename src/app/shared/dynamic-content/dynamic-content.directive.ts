import { Directive, Input, DynamicComponentLoader, Component, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamic-content]',
  providers: [  ],
})
export class DynamicContent {
  @Input('dynamic-content') value;
  @Input() local;

  constructor(
    private dsl: DynamicComponentLoader,
    private viewRef: ViewContainerRef,
  ) {

  }

  ngOnInit() {
    this.load(this.value);
  }

  private load(template) {
    this.dsl.loadNextToLocation(toComponent(template, this.local), this.viewRef);
  }
}

function toComponent(template: string, locals?) {
  @Component({
    selector: 'content-component',
    template,
  })
  class ContentComponent {
    constructor() {
      Object.assign(this, locals)
    }
  }

  return ContentComponent;
}
