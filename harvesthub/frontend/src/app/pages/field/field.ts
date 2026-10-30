import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FieldService } from '../../services/field.service';
import { Field as FieldModel } from '../../models/field';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './field.html',
  styleUrl: './field.css'
})
export class Field implements OnInit {

  fields: FieldModel[] = [];

  field: FieldModel = {
    fieldName: '',
    area: 0,
    soilType: '',
    irrigationType: '',
    status: ''
  };

  editing = false;
  editingId?: number;

  saving = false;

  constructor(private service: FieldService) {}

  ngOnInit(): void {
    this.loadFields();
  }

  loadFields(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.fields = data;
      },
      error: (error) => {
        console.error('Error loading fields:', error);
      }
    });
  }

  save(): void {

    if (this.saving) {
      return;
    }

    this.saving = true;

    // UPDATE
    if (this.editing && this.editingId !== undefined) {

      this.service.update(this.editingId, this.field).subscribe({

        next: () => {

          this.reset();
          this.loadFields();

          this.saving = false;

          alert('Field updated successfully');
        },

        error: (error) => {

          console.error('Error updating field:', error);

          this.saving = false;

          alert('Failed to update field');
        }

      });

    }

    // ADD
    else {

      this.service.add(this.field).subscribe({

        next: () => {

          this.reset();
          this.loadFields();

          this.saving = false;

          alert('Field added successfully');
        },

        error: (error) => {

          console.error('Error adding field:', error);

          this.saving = false;

          alert('Failed to add field');
        }

      });

    }
  }

  edit(field: FieldModel): void {

    this.field = {
      fieldName: field.fieldName,
      area: field.area,
      soilType: field.soilType,
      irrigationType: field.irrigationType,
      status: field.status
    };

    this.editing = true;
    this.editingId = field.id;
  }

  delete(id?: number): void {

    if (id === undefined) {
      return;
    }

    if (confirm('Delete this field?')) {

      this.service.delete(id).subscribe({

        next: () => {

          this.loadFields();

          alert('Field deleted successfully');
        },

        error: (error) => {

          console.error('Error deleting field:', error);

          alert('Failed to delete field');
        }

      });

    }
  }

  reset(): void {

    this.field = {
      fieldName: '',
      area: 0,
      soilType: '',
      irrigationType: '',
      status: ''
    };

    this.editing = false;
    this.editingId = undefined;
    this.saving = false;
  }
}