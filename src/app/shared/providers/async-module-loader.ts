import {
  NgModuleFactoryLoader,
  Injectable,
  Compiler,
  NgModuleFactory,
  Type,
} from '@angular/core';

/**
 * NgModuleFactoryLoader that uses Promise to load NgModule type and then compiles them.
 * @experimental
 */
@Injectable()
export class AsyncNgModuleLoader implements NgModuleFactoryLoader {
  constructor(private compiler: Compiler) {}

  load(modulePath: string | Function): Promise<NgModuleFactory<any>> {
    if (typeof modulePath === 'function') {
      return Promise
        .resolve(modulePath())
        .then((type: any) => checkNotEmpty(type, '', ''))
        .then((type: any) => this.compiler.compileModuleAsync(type));
    }

    return Promise.resolve(undefined);
  }
}

function checkNotEmpty(value: any, modulePath: string, exportName: string): any {
  if (!value) {
    throw new Error(`Cannot find '${exportName}' in '${modulePath}'`);
  }
  return value;
}

export const asyncWrap: Type = (a: Function) => a;
