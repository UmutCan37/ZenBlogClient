import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { BlogDto } from '../_models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseUrl = "https://localhost:7000/api/blogs/"

  constructor(private http: HttpClient) { }

  getBlogs() {
    return this.http.get<Result<BlogDto[]>>(this.baseUrl);
  }

  getBlogById(id: string) {
    return this.http.get<Result<BlogDto>>(this.baseUrl + id);
  }

  create(blogDto: BlogDto) {
    return this.http.post<Result<boolean>>(this.baseUrl, blogDto);
  }

  update(blogDto: BlogDto) {
    return this.http.put<Result<boolean>>(this.baseUrl, blogDto);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
