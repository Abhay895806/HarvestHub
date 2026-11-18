import { Component, OnInit } from '@angular/core';
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

  constructor(private service: CropService) {}

  ngOnInit(): void {
    this.loadCrops();
  }

  loadCrops(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.crops = data;
      },
      error: (error) => {
        console.error('Error loading crops:', error);
      }
    });
  }

  save(): void {

    if (this.editing && this.editingId !== undefined) {

      this.service.update(this.editingId, this.crop).subscribe({
        next: () => {
          alert('Crop updated successfully');
          this.reset();
          this.loadCrops();
        },
        error: (error) => {
          console.error('Error updating crop:', error);
          alert('Failed to update crop');
        }
      });

    } else {

      this.service.add(this.crop).subscribe({
        next: () => {
          alert('Crop added successfully');
          this.reset();
          this.loadCrops();
        },
        error: (error) => {
          console.error('Error adding crop:', error);
          alert('Failed to add crop');
        }
      });

    }
  }

  edit(crop: CropModel): void {

    this.crop = {
      cropName: crop.cropName,
      cropType: crop.cropType,
      season: crop.season,
      duration: crop.duration
    };

    this.editing = true;
    this.editingId = crop.id;
  }

  delete(id?: number): void {

    if (id === undefined) {
      return;
    }

    if (confirm('Delete this crop?')) {

      this.service.delete(id).subscribe({
        next: () => {
          alert('Crop deleted successfully');
          this.loadCrops();
        },
        error: (error) => {
          console.error('Error deleting crop:', error);
          alert('Failed to delete crop');
        }
      });

    }
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
  }
}