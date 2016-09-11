import {
  Directive,
  Input,
  Component,
  ViewContainerRef,
  Compiler,
  NgModule,
  ReflectiveInjector,
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

@Directive({
  selector: '[dynamic-content]',
  providers: [  ],
})
export class DynamicContent {
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
      imports: [BrowserModule],
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

