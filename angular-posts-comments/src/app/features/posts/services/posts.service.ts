import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Post } from '../../../shared/models/post.model';
import { ApiResponse, PaginatedResponse } from '../../../shared/models/paginated-response.model';
import { Observable } from 'rxjs';
import { PostComment } from '../../../shared/models/comment.model';

@Injectable({ providedIn: 'root' })
export class PostsService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/posts';

  getPosts(page = 1, limit = 5): Observable<ApiResponse<PaginatedResponse<Post>>> {

    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http
      .get<ApiResponse<PaginatedResponse<Post>>>(this.baseUrl, { params })
      .pipe(
        delay(500) // UX loading obligatorio
      );
  }

  getPostById(id: string) {
    return this.http.get<ApiResponse<Post>>(`${this.baseUrl}/${id}`);
  }

  getCommentsByPost(postId: string) {
    return this.http.get<ApiResponse<PaginatedResponse<PostComment>>>(
      'http://localhost:3000/api/comments',
      { params: { postId } }
    );
  }
}