import {
  Directive,
  Input,
  Component,
  ViewContainerRef,
  Compiler,
  NgModule,
  ReflectiveInjector,
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Directive({
  selector: '[dynamic-content]',
  providers: [  ],
})
export class DynamicContentDirective {
  @Input('dynamic-content') value;
  @Input('local') local;

  constructor(
    private compiler: Compiler,
    private viewRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.load(this.value);
  }

  private load(template) {
    let local = this.local;
    console.log(local);
    @Component({
      selector: 'content-component',
      template,
    })
    class ContentComponent {
      constructor() {
        Object.assign(this, local);
      }
    }

    @NgModule({
      imports: [CommonModule],
      declarations: [ContentComponent],
    })
    class DynamicModule {}
    this.compiler.compileModuleAndAllComponentsAsync(DynamicModule)
      .then(factory => {
        const compFactory = factory.componentFactories.find(x => x.componentType === ContentComponent);
        const injector = ReflectiveInjector.fromResolvedProviders([], this.viewRef.parentInjector);
        this.viewRef.createComponent(compFactory, 0, injector, []);
      });
  }
}

