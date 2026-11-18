import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Field } from '../models/field';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private apiUrl = 'http://localhost:8081/field';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Field[]> {
    return this.http.get<Field[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Field> {
    return this.http.get<Field>(`${this.apiUrl}/id/${id}`);
  }

  add(field: Field): Observable<Field> {
    return this.http.post<Field>(
      `${this.apiUrl}/add`,
      field
    );
  }

  update(id: number, field: Field): Observable<Field> {
    return this.http.put<Field>(
      `${this.apiUrl}/update/${id}`,
      field
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}