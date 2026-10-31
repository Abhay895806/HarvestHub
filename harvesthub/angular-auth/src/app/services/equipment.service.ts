import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private apiUrl = 'http://localhost:8081/equipment';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.apiUrl}/id/${id}`);
  }

  add(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(
      `${this.apiUrl}/add`,
      equipment
    );
  }

  update(id: number, equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(
      `${this.apiUrl}/update/${id}`,
      equipment
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}