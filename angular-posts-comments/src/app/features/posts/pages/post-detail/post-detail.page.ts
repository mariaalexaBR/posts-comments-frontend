import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { PostsService } from '../../services/posts.service';
import { Post } from '../../../../shared/models/post.model';
import { PostComment } from '../../../../shared/models/comment.model';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, ReactiveFormsModule],
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

  submitComment() {
    if (this.commentForm.invalid || !this.post()) return;

    const payload = {
      ...this.commentForm.value,
      postId: this.post()?._id
    };

    this.postsService.createComment(payload).subscribe({
      next: (res) => {
        const newComment = res.data;
        this.comments.update(current => [newComment, ...current]);
        this.commentForm.reset();
      },
      error: (err) => console.error(err)
    });
  }
}