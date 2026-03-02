import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PostsService } from '../services/posts.service';
import { Post } from '../../../shared/models/post.model';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    CommonModule,   // <-- Necesario para *ngIf y *ngFor
    DatePipe,        // <-- Necesario para | date
    RouterLink
  ],
  templateUrl: './posts-list.page.html',
})
export class PostsListPage implements OnInit {

  private postsService = inject(PostsService);

  posts = signal<Post[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  search = signal<string>('');

  filteredPosts = computed(() =>
    this.posts().filter(p =>
      p.title.toLowerCase().includes(this.search().toLowerCase())
    )
  );

  page = signal(1);
  totalPages = signal(1);

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
  this.loading.set(true);

  this.postsService.getPosts(this.page(), 2)
    .pipe(
      tap(response => {

        console.log('API RESPONSE:', response); // 🔥 DEBUG

        if (!response?.success) {
          throw new Error('Invalid response');
        }

        this.posts.set(response.data.items);
        this.totalPages.set(response.data.meta.totalPages);
        this.error.set(null);

        this.loading.set(false);
      }),
      catchError((err) => {
        console.error('HTTP ERROR:', err); // 🔥 DEBUG
        this.error.set('Error loading posts');
        this.loading.set(false);
        return of(null);
      })
    )
    .subscribe();
}

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update(p => p + 1);
      this.loadPosts();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.loadPosts();
    }
  }
}