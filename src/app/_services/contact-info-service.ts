import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { ContactInfoDto } from '../_models/content-info';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
  baseUrl = "https://localhost:7000/api/contactInfos/"

  constructor(private http: HttpClient) { }

  getContactInfos() {
    return this.http.get<Result<ContactInfoDto[]>>(this.baseUrl);
  }

  create(contactInfo: ContactInfoDto) {
    return this.http.post<Result<boolean>>(this.baseUrl, contactInfo);
  }

  update(contactInfo: ContactInfoDto) {
    return this.http.put<Result<boolean>>(this.baseUrl, contactInfo);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
