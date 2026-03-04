import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../../../shared/models/post.model';

@Component({
  selector: 'app-post-header',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './post-header.component.html'
})
export class PostHeaderComponent {
  @Input() post!: Post;
}