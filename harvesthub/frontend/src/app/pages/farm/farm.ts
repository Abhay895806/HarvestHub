import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FarmProfileService } from '../../services/farm-profile.service';
import { FarmProfile } from '../../models/farm-profile';

@Component({
  selector: 'app-farm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './farm.html',
  styleUrl: './farm.css'
})
export class Farm implements OnInit {

  farms: FarmProfile[] = [];

  farm: FarmProfile = {
    farmName: '',
    ownerName: '',
    location: '',
    totalArea: 0,
    areaUnit: ''
  };

  editing = false;
  editingId?: number;

  constructor(private service: FarmProfileService) {}

  ngOnInit(): void {
    this.loadFarms();
  }

  loadFarms(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.farms = data;
      },
      error: (error) => {
        console.error('Error loading farms:', error);
      }
    });
  }

  save(): void {

    if (this.editing && this.editingId !== undefined) {

      this.service.update(this.editingId, this.farm).subscribe({
        next: () => {
          alert('Farm updated successfully');
          this.reset();
          this.loadFarms();
        },
        error: (error) => {
          console.error('Error updating farm:', error);
          alert('Failed to update farm');
        }
      });

    } else {

      this.service.add(this.farm).subscribe({
        next: () => {
          alert('Farm added successfully');
          this.reset();
          this.loadFarms();
        },
        error: (error) => {
          console.error('Error adding farm:', error);
          alert('Failed to add farm');
        }
      });

    }
  }

  edit(farm: FarmProfile): void {

    this.farm = {
      farmName: farm.farmName,
      ownerName: farm.ownerName,
      location: farm.location,
      totalArea: farm.totalArea,
      areaUnit: farm.areaUnit
    };

    this.editing = true;
    this.editingId = farm.id;
  }

  delete(id?: number): void {

    if (id === undefined) {
      return;
    }

    if (confirm('Delete this farm?')) {

      this.service.delete(id).subscribe({
        next: () => {
          alert('Farm deleted successfully');
          this.loadFarms();
        },
        error: (error) => {
          console.error('Error deleting farm:', error);
          alert('Failed to delete farm');
        }
      });

    }
  }

  reset(): void {

    this.farm = {
      farmName: '',
      ownerName: '',
      location: '',
      totalArea: 0,
      areaUnit: ''
    };

    this.editing = false;
    this.editingId = undefined;
  }
}