import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { LoginRequest, RegisterRequest, AuthResult, DecodedToken } from '../_models/auth';

const TOKEN_KEY = 'zenblog_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "https://localhost:7000/api/users/";

  constructor(private http: HttpClient) { }

  login(request: LoginRequest) {
    return this.http.post<Result<AuthResult>>(this.baseUrl + 'login', request);
  }

  register(request: RegisterRequest) {
    return this.http.post<Result<AuthResult>>(this.baseUrl + 'register', request);
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.decodeToken(token);
    if (!decoded) return false;

    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      this.logout();
      return false;
    }

    return true;
  }

  decodeToken(token: string): DecodedToken | null {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return decoded;
    } catch {
      return null;
    }
  }

  getCurrentUser(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    return this.decodeToken(token);
  }

  getUserId(): string | null {
    return this.getCurrentUser()?.sub ?? null;
  }
}
