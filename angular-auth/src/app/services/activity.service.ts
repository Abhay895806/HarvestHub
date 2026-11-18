import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = 'http://localhost:8081/activity';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiUrl}/id/${id}`);
  }

  add(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiUrl}/add`, activity);
  }

  update(id: number, activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(
      `${this.apiUrl}/update/${id}`,
      activity
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}