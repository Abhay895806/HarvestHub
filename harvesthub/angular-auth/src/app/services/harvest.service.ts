import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Harvest } from '../models/harvest';

@Injectable({
  providedIn: 'root'
})
export class HarvestService {

  private apiUrl = 'http://localhost:8081/harvest';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Harvest[]> {
    return this.http.get<Harvest[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Harvest> {
    return this.http.get<Harvest>(`${this.apiUrl}/id/${id}`);
  }

  add(harvest: Harvest): Observable<Harvest> {
    return this.http.post<Harvest>(`${this.apiUrl}/add`, harvest);
  }

  update(id: number, harvest: Harvest): Observable<Harvest> {
    return this.http.put<Harvest>(
      `${this.apiUrl}/update/${id}`,
      harvest
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }

  search(quality: string): Observable<Harvest[]> {
    return this.http.get<Harvest[]>(
      `${this.apiUrl}/search?quality=${quality}`
    );
  }
}