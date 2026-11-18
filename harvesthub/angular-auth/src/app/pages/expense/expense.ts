import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense as ExpenseModel } from '../../models/expense';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense.html',
  styleUrl: './expense.css'
})
export class Expense implements OnInit {
  expenses: ExpenseModel[] = [];

  expense: ExpenseModel = {
    expenseType: '',
    amount: 0,
    expenseDate: '',
    description: ''
  };

  editing = false;
  editingId?: number;
  saving = false;

  constructor(
    private service: ExpenseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe({
      next: data => {
        this.expenses = data || [];
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error loading expenses:', error);
        this.expenses = [];
        this.cdr.detectChanges();
      }
    });
  }

  save(): void {
    if (this.saving) return;

    this.saving = true;

    const request = this.editing && this.editingId !== undefined
      ? this.service.update(this.editingId, this.expense)
      : this.service.add(this.expense);

    request.subscribe({
      next: () => {
        alert(this.editing ? 'Expense updated successfully' : 'Expense added successfully');
        this.reset();
        this.load();
      },
      error: error => {
        console.error('Error saving expense:', error);
        alert('Failed to save expense');
        this.saving = false;
      }
    });
  }

  edit(item: ExpenseModel): void {
    this.expense = {
      expenseType: item.expenseType,
      amount: item.amount,
      expenseDate: item.expenseDate,
      description: item.description
    };

    this.editing = true;
    this.editingId = item.id;
  }

  delete(id?: number): void {
    if (id === undefined || !confirm('Delete this expense?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        alert('Expense deleted successfully');
        this.load();
      },
      error: error => {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
      }
    });
  }

  reset(): void {
    this.expense = {
      expenseType: '',
      amount: 0,
      expenseDate: '',
      description: ''
    };

    this.editing = false;
    this.editingId = undefined;
    this.saving = false;
  }
}