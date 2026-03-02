import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { ApiResponse, PaginatedResponse, Post } from '../../../shared/models/post.model';
import { Observable } from 'rxjs';

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
}