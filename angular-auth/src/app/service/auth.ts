import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('harvesthub_token');
  }

  saveSession(response: any): void {
    localStorage.setItem('harvesthub_token', response.token);
    localStorage.setItem('harvesthub_name', response.name);
  }

  logout(): void {
    localStorage.removeItem('harvesthub_token');
    localStorage.removeItem('harvesthub_name');
  }
}
