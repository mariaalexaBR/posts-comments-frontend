import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComment } from '../../../../shared/models/comment.model';

@Component({
  selector: 'app-comment-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-table.component.html'
})
export class CommentTableComponent {

  comments = input<PostComment[]>([]); // 👈 cambio clave

  page = signal(1);
  pageSize = 5;

  totalPages = computed(() =>
    Math.ceil(this.comments().length / this.pageSize)
  );

  paginatedComments = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.comments().slice(start, start + this.pageSize);
  });

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
    }
  }
}