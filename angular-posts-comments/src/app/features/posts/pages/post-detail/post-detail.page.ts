import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { PostsService } from '../../services/posts.service';
import { Post } from '../../../../shared/models/post.model';
import { PostComment } from '../../../../shared/models/comment.model';
import { FormBuilder, Validators } from '@angular/forms';
import { PostHeaderComponent } from '../../components/post-header.component/post-header.component';
import { CommentFormComponent } from '../../components/comment-form.component/comment-form.component';
import { CommentListComponent } from '../../components/comment-list.component/comment-list.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule, 
    PostHeaderComponent,
    CommentFormComponent,
    CommentListComponent
  ],
  templateUrl: './post-detail.page.html',
})
export class PostDetailPage {

  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  private fb = inject(FormBuilder);

  post = signal<Post | null>(null);
  comments = signal<PostComment[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  commentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    body: ['', [Validators.required, Validators.minLength(5)]],
  });

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

  onCommentSubmit(data: any) {

    const payload = {
      ...data,
      postId: this.post()?._id
    };

    this.postsService.createComment(payload)
      .subscribe(res => {
        this.comments.update(current => [res.data, ...current]);
      });
  }
}