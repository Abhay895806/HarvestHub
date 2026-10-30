import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Crop } from '../models/crop';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  private apiUrl = 'http://localhost:8081/crop';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Crop[]> {
    return this.http.get<Crop[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Crop> {
    return this.http.get<Crop>(`${this.apiUrl}/id/${id}`);
  }

  add(crop: Crop): Observable<Crop> {
    return this.http.post<Crop>(
      `${this.apiUrl}/add`,
      crop
    );
  }

  update(id: number, crop: Crop): Observable<Crop> {
    return this.http.put<Crop>(
      `${this.apiUrl}/update/${id}`,
      crop
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}