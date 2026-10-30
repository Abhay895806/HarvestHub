import { Component, OnInit } from '@angular/core';
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

  constructor(
    private rotationRecordService: RotationRecordService
  ) {}

  ngOnInit(): void {
    this.loadRotationRecords();
  }

  loadRotationRecords(): void {
    this.rotationRecordService.getAll().subscribe({
      next: (data) => {
        this.rotationRecords = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  saveRotationRecord(): void {

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

    if (this.editingId !== null) {

      this.rotationRecordService
        .update(this.editingId, this.rotationRecord)
        .subscribe({
          next: () => {
            alert('Rotation record updated successfully');
            this.resetForm();
            this.loadRotationRecords();
          },
          error: (error) => {
            console.error(error);
          }
        });

    } else {

      this.rotationRecordService
        .add(this.rotationRecord)
        .subscribe({
          next: () => {
            alert('Rotation record added successfully');
            this.resetForm();
            this.loadRotationRecords();
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
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

    if (confirm('Are you sure you want to delete this record?')) {

      this.rotationRecordService.delete(id).subscribe({
        next: () => {
          alert('Rotation record deleted successfully');
          this.loadRotationRecords();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
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
  }
}