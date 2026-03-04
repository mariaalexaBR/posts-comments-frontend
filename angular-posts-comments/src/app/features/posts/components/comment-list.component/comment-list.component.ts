import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComment } from '../../../../shared/models/comment.model';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html'
})
export class CommentListComponent {
  @Input() comments: PostComment[] = [];
}