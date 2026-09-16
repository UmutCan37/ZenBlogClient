import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { CommentDto } from '../_models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = "https://localhost:7000/api/comments/"

  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get<Result<CommentDto[]>>(this.baseUrl);
  }

  create(comment: any) {
    return this.http.post<Result<boolean>>(this.baseUrl, comment);
  }

  update(comment: any) {
    return this.http.put<Result<boolean>>(this.baseUrl, comment);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
