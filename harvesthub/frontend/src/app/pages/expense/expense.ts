import { Component, OnInit } from '@angular/core';
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

  constructor(private service: ExpenseService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.expenses = data;
      },
      error: (error) => {
        console.error('Error loading expenses:', error);
      }
    });
  }

  save(): void {
    if (this.editing && this.editingId !== undefined) {

      this.service.update(this.editingId, this.expense).subscribe({
        next: () => {
          alert('Expense updated successfully');
          this.reset();
          this.load();
        },
        error: (error) => {
          console.error('Error updating expense:', error);
          alert('Failed to update expense');
        }
      });

    } else {

      this.service.add(this.expense).subscribe({
        next: () => {
          alert('Expense added successfully');
          this.reset();
          this.load();
        },
        error: (error) => {
          console.error('Error adding expense:', error);
          alert('Failed to add expense');
        }
      });

    }
  }

  edit(expense: ExpenseModel): void {

    this.expense = {
      expenseType: expense.expenseType,
      amount: expense.amount,
      expenseDate: expense.expenseDate,
      description: expense.description
    };

    this.editing = true;
    this.editingId = expense.id;
  }

  delete(id?: number): void {

    if (id === undefined) {
      return;
    }

    if (confirm('Delete this expense?')) {

      this.service.delete(id).subscribe({
        next: () => {
          alert('Expense deleted successfully');
          this.load();
        },
        error: (error) => {
          console.error('Error deleting expense:', error);
          alert('Failed to delete expense');
        }
      });

    }
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
  }
}