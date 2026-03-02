import { Routes } from '@angular/router';
import { PostsListPage } from './features/posts/pages/posts-list.page';
import { PostDetailPage } from './features/posts/pages/post-detail.page';

export const routes: Routes = [
  { path: '', component: PostsListPage },
  { path: 'posts/:id', component: PostDetailPage }
];