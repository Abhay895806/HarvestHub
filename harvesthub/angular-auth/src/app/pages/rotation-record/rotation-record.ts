import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RotationRecordService } from '../../services/rotation-record.service';
import { RotationRecord as RotationRecordModel } from '../../models/rotation-record';

@Component({
  selector: 'app-rotation-record',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rotation-record.html',
  styleUrl: './rotation-record.css'
})
export class RotationRecord implements OnInit {
  rotationRecords: RotationRecordModel[] = [];

  rotationRecord: RotationRecordModel = {
    fieldName: '',
    previousCrop: '',
    nextCrop: '',
    rotationDate: '',
    season: ''
  };

  editingId: number | null = null;
  saving = false;

  constructor(
    private service: RotationRecordService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRotationRecords();
  }

  loadRotationRecords(): void {
    this.service.getAll().subscribe({
      next: data => {
        this.rotationRecords = data || [];
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error loading rotation records:', error);
        this.rotationRecords = [];
        this.cdr.detectChanges();
      }
    });
  }

  saveRotationRecord(): void {
    if (this.saving) return;

    if (
      !this.rotationRecord.fieldName ||
      !this.rotationRecord.previousCrop ||
      !this.rotationRecord.nextCrop ||
      !this.rotationRecord.rotationDate ||
      !this.rotationRecord.season
    ) {
      alert('Please fill all fields');
      return;
    }

    this.saving = true;

    const request = this.editingId !== null
      ? this.service.update(this.editingId!, this.rotationRecord)
      : this.service.add(this.rotationRecord);

    request.subscribe({
      next: () => {
        alert(this.editingId !== null
          ? 'Rotation record updated successfully'
          : 'Rotation record added successfully');

        this.resetForm();
        this.loadRotationRecords();
      },
      error: error => {
        console.error('Error saving rotation record:', error);
        alert('Failed to save rotation record');
        this.saving = false;
      }
    });
  }

  editRotationRecord(record: RotationRecordModel): void {
    this.editingId = record.id ?? null;

    this.rotationRecord = {
      fieldName: record.fieldName,
      previousCrop: record.previousCrop,
      nextCrop: record.nextCrop,
      rotationDate: record.rotationDate,
      season: record.season
    };
  }

  deleteRotationRecord(id: number): void {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        alert('Rotation record deleted successfully');
        this.loadRotationRecords();
      },
      error: error => {
        console.error('Error deleting rotation record:', error);
        alert('Failed to delete rotation record');
      }
    });
  }

  resetForm(): void {
    this.rotationRecord = {
      fieldName: '',
      previousCrop: '',
      nextCrop: '',
      rotationDate: '',
      season: ''
    };

    this.editingId = null;
    this.saving = false;
  }
}