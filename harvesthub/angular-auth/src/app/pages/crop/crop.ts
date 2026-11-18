import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CropService } from '../../services/crop.service';
import { Crop as CropModel } from '../../models/crop';

@Component({
  selector: 'app-crop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crop.html',
  styleUrl: './crop.css'
})
export class Crop implements OnInit {
  crops: CropModel[] = [];

  crop: CropModel = {
    cropName: '',
    cropType: '',
    season: '',
    duration: ''
  };

  editing = false;
  editingId?: number;
  saving = false;

  constructor(
    private service: CropService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCrops();
  }

  loadCrops(): void {
    this.service.getAll().subscribe({
      next: data => {
        this.crops = data || [];
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error loading crops:', error);
        this.crops = [];
        this.cdr.detectChanges();
      }
    });
  }

  save(): void {
    if (this.saving) return;

    this.saving = true;

    const request = this.editing && this.editingId !== undefined
      ? this.service.update(this.editingId, this.crop)
      : this.service.add(this.crop);

    request.subscribe({
      next: () => {
        alert(this.editing ? 'Crop updated successfully' : 'Crop added successfully');
        this.reset();
        this.loadCrops();
      },
      error: error => {
        console.error('Error saving crop:', error);
        alert('Failed to save crop');
        this.saving = false;
      }
    });
  }

  edit(item: CropModel): void {
    this.crop = {
      cropName: item.cropName,
      cropType: item.cropType,
      season: item.season,
      duration: item.duration
    };

    this.editing = true;
    this.editingId = item.id;
  }

  delete(id?: number): void {
    if (id === undefined || !confirm('Delete this crop?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        alert('Crop deleted successfully');
        this.loadCrops();
      },
      error: error => {
        console.error('Error deleting crop:', error);
        alert('Failed to delete crop');
      }
    });
  }

  reset(): void {
    this.crop = {
      cropName: '',
      cropType: '',
      season: '',
      duration: ''
    };

    this.editing = false;
    this.editingId = undefined;
    this.saving = false;
  }
}