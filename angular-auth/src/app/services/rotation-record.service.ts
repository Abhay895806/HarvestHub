import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RotationRecord } from '../models/rotation-record';

@Injectable({
  providedIn: 'root'
})
export class RotationRecordService {

  private apiUrl = 'http://localhost:8081/rotation';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RotationRecord[]> {
    return this.http.get<RotationRecord[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<RotationRecord> {
    return this.http.get<RotationRecord>(`${this.apiUrl}/id/${id}`);
  }

  add(rotationRecord: RotationRecord): Observable<RotationRecord> {
    return this.http.post<RotationRecord>(
      `${this.apiUrl}/add`,
      rotationRecord
    );
  }

  update(
    id: number,
    rotationRecord: RotationRecord
  ): Observable<RotationRecord> {
    return this.http.put<RotationRecord>(
      `${this.apiUrl}/update/${id}`,
      rotationRecord
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}