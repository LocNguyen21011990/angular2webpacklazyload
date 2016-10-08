import { NgModule } from '@angular/core';
import { GridCol } from './col.directive';

@NgModule({
  declarations: [
    GridCol,
  ],
  exports: [
    GridCol,
  ],
})
export class GridModule {}
