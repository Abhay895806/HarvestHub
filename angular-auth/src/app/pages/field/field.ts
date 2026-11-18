
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private service: FieldService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFields();
  }

  // LOAD ALL FIELDS
  loadFields(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('Field API Data:', data);

        this.fields = data || [];

        console.log('Total Fields:', this.fields.length);
        console.log('Fields Array:', this.fields);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading fields:', error);
        this.fields = [];
        this.cdr.detectChanges();
      }
    });
  }

  // ADD OR UPDATE FIELD
  save(): void {

    if (this.saving) {
      return;
    }

    this.saving = true;

    if (this.editing && this.editingId !== undefined) {

      this.service.update(this.editingId, this.field).subscribe({
        next: () => {
          alert('Field updated successfully!');
          this.reset();
          this.loadFields();
        },
        error: (error) => {
          console.error('Error updating field:', error);
          alert('Failed to update field!');
          this.saving = false;
        }
      });

    } else {

      this.service.add(this.field).subscribe({
        next: () => {
          alert('Field added successfully!');
          this.reset();
          this.loadFields();
        },
        error: (error) => {
          console.error('Error adding field:', error);
          alert('Failed to add field!');
          this.saving = false;
        }
      });

    }
  }

  // EDIT FIELD
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

  // DELETE FIELD
  delete(id?: number): void {

    if (id === undefined) {
      return;
    }

    if (confirm('Are you sure you want to delete this field?')) {

      this.service.delete(id).subscribe({
        next: () => {
          alert('Field deleted successfully!');
          this.loadFields();
        },
        error: (error) => {
          console.error('Error deleting field:', error);
          alert('Failed to delete field!');
        }
      });

    }
  }

  // RESET FORM
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
