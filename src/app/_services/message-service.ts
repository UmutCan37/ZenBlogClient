import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { MessageDto } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = "https://localhost:7000/api/messages/"

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get<Result<MessageDto[]>>(this.baseUrl);
  }

  getUnread() {
    return this.http.get<Result<MessageDto[]>>(this.baseUrl + 'Unread');
  }

  getRead() {
    return this.http.get<Result<MessageDto[]>>(this.baseUrl + 'read');
  }

  create(message: any) {
    return this.http.post<Result<boolean>>(this.baseUrl, message);
  }

  markAsRead(message: MessageDto) {
    return this.http.put<Result<boolean>>(this.baseUrl, { ...message, isRead: true });
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
