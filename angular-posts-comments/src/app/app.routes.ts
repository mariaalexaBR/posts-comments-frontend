import { Routes } from '@angular/router';
import { PostsListPage } from './features/posts/pages/posts-list.page';
import { PostDetailPage } from './features/posts/pages/post-detail.page';
import { PostFormPage } from '../app/features/posts/pages/post-form/post-form.page';

export const routes: Routes = [
  { path: '', component: PostsListPage },

  { path: 'posts/new', component: PostFormPage },

  { path: 'posts/:id/edit', component: PostFormPage },

  { path: 'posts/:id', component: PostDetailPage }
];