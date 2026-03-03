import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { PostsService } from '../services/posts.service';
import { Post } from '../../../shared/models/post.model';
import { PostComment } from '../../../shared/models/comment.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './post-detail.page.html',
})
export class PostDetailPage {

  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);

  post = signal<Post | null>(null);
  comments = signal<PostComment[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;

        return this.postsService.getPostById(id).pipe(
          tap(res => {
            this.post.set(res.data);
          }),
          switchMap(() => this.postsService.getCommentsByPost(id)),
          tap(res => {
            this.comments.set(res.data.items);
          })
        );
      }),
      catchError(err => {
        this.error.set(err.message);
        return of(null);
      })
    ).subscribe(() => {
      this.loading.set(false);
    });
  }
}