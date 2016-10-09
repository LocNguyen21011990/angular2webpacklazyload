import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { Feed } from './feed.component';

export const FeedRoutes: Routes = [{
  path: '',
  component: Feed,
}];

export const FeedRoutingModule = RouterModule.forChild(FeedRoutes);
