import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './post-form.page.html'
})
export class PostFormPage implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private postsService = inject(PostsService);

  loading = signal(false);
  error = signal<string | null>(null);

  isEditMode = false;
  postId!: string;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(10)]],
    author: ['', [Validators.required]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && this.route.snapshot.routeConfig?.path?.includes('edit')) {
      this.isEditMode = true;
      this.postId = id;
      this.loadPost();
    }
  }

  loadPost() {
    this.loading.set(true);

    this.postsService.getPostById(this.postId).subscribe({
      next: (res) => {
        this.form.patchValue(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error loading post');
        this.loading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    if (this.isEditMode) {
      this.postsService.updatePost(this.postId, this.form.value)
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigateByUrl('/');
          },
          error: () => {
            this.error.set('Error updating post');
            this.loading.set(false);
          }
        });
    } else {
      this.postsService.createPost(this.form.value)
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigateByUrl('/');
          },
          error: () => {
            this.error.set('Error creating post');
            this.loading.set(false);
          }
        });
    }
  }
}