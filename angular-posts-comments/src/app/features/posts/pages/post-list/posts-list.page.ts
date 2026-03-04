import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../../../shared/models/post.model';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table.component/data-table.component';
import { PaginationComponent } from '../../../../shared/components/pagination.component/pagination.component';



@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    CommonModule,   // <-- Necesario para *ngIf y *ngFor
    RouterLink,
    RouterModule,
    DataTableComponent,
    PaginationComponent
  ],
  templateUrl: './posts-list.page.html',
})
export class PostsListPage implements OnInit {

  private postsService = inject(PostsService);
  private router = inject(Router);

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

  columns: TableColumn[] = [
    { header: 'Title', field: 'title' },
    { header: 'Author', field: 'author' },
    { header: 'Created At', field: 'createdAt' }
  ];

  actions = [
    { label: 'View', type: 'view' },
    { label: 'Edit', type: 'edit' },
    { label: 'Delete', type: 'delete' }
  ];

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading.set(true);

    this.postsService.getPosts(this.page(), 10)
      .pipe(
        tap(response => {

          if (!response?.success) {
            throw new Error('Invalid response');
          }

          this.posts.set(response.data.items);
          this.totalPages.set(response.data.meta.totalPages);
          this.error.set(null);

          this.loading.set(false);
        }),
        catchError((err) => {
          this.error.set(err.message);
          this.loading.set(false);
          return of(null);
        })
      )
      .subscribe();
  }

  onPageChange(newPage: number) {
    this.page.set(newPage);
    this.loadPosts();
  }

  handleAction(event: { action: string; row: Post }) {

    const post = event.row;

    switch (event.action) {

      case 'view':
        this.router.navigate(['/posts', post._id]);
        break;

      case 'edit':
        this.router.navigate(['/posts', post._id, 'edit']);
        break;

      case 'delete':
        if (confirm('Are you sure?')) {
          // luego conectamos al backend
          console.log('Delete', post._id);
        }
        break;
    }
  }
}