import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FarmProfile } from '../models/farm-profile';

@Injectable({
  providedIn: 'root'
})
export class FarmProfileService {

  private apiUrl = 'http://localhost:8081/farm';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FarmProfile[]> {
    return this.http.get<FarmProfile[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<FarmProfile> {
    return this.http.get<FarmProfile>(`${this.apiUrl}/id/${id}`);
  }

  add(farm: FarmProfile): Observable<FarmProfile> {
    return this.http.post<FarmProfile>(
      `${this.apiUrl}/add`,
      farm
    );
  }

  update(id: number, farm: FarmProfile): Observable<FarmProfile> {
    return this.http.put<FarmProfile>(
      `${this.apiUrl}/update/${id}`,
      farm
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}