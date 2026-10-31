import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CropPlan } from '../models/crop-plan';

@Injectable({
  providedIn: 'root'
})
export class CropPlanService {

  private apiUrl = 'http://localhost:8081/crop-plan';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CropPlan[]> {
    return this.http.get<CropPlan[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<CropPlan> {
    return this.http.get<CropPlan>(`${this.apiUrl}/id/${id}`);
  }

  add(cropPlan: CropPlan): Observable<CropPlan> {
    return this.http.post<CropPlan>(
      `${this.apiUrl}/add`,
      cropPlan
    );
  }

  update(id: number, cropPlan: CropPlan): Observable<CropPlan> {
    return this.http.put<CropPlan>(
      `${this.apiUrl}/update/${id}`,
      cropPlan
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}