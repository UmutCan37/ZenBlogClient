import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { SocialDto } from '../_models/social';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  baseUrl = "https://localhost:7000/api/socials/"

  constructor(private http: HttpClient) { }

  getSocials() {
    return this.http.get<Result<SocialDto[]>>(this.baseUrl);
  }

  create(social: SocialDto) {
    return this.http.post<Result<boolean>>(this.baseUrl, social);
  }

  update(social: SocialDto) {
    return this.http.put<Result<boolean>>(this.baseUrl, social);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
