import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {

  @Input() page: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  prev() {
    if (this.page > 1) {
      this.pageChange.emit(this.page - 1);
    }
  }

  next() {
    if (this.page < this.totalPages) {
      this.pageChange.emit(this.page + 1);
    }
  }
}