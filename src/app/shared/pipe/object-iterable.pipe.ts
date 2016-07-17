import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectIterable',
  pure: true,
})
export class ObjectIterablePipe implements PipeTransform{
  transform(object) {
    return Object.keys(object).map(key => ({
      key,
      value: object[key],
    }));
  }
}
