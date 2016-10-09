import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import { FeedRoutingModule } from './feed-routing.module';
import { Feed } from './feed.component';

@NgModule({
  imports: [
    SharedModule,
    FeedRoutingModule,
  ],

  declarations: [
    Feed,
  ],

  entryComponents: [
    Feed,
  ],
})
export class FeedModule {}
