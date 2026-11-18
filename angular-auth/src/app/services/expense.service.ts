import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:8081/expense';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/id/${id}`);
  }

  add(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(
      `${this.apiUrl}/add`,
      expense
    );
  }

  update(id: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(
      `${this.apiUrl}/update/${id}`,
      expense
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}