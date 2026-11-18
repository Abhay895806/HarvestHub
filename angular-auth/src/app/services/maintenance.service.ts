import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private apiUrl = 'http://localhost:8081/maintenance';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Maintenance> {
    return this.http.get<Maintenance>(`${this.apiUrl}/id/${id}`);
  }

  add(maintenance: Maintenance): Observable<Maintenance> {
    return this.http.post<Maintenance>(
      `${this.apiUrl}/add`,
      maintenance
    );
  }

  update(id: number, maintenance: Maintenance): Observable<Maintenance> {
    return this.http.put<Maintenance>(
      `${this.apiUrl}/update/${id}`,
      maintenance
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}