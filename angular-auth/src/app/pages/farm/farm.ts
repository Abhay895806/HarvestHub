
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private service: FarmProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFarms();
  }

  // Load all farms
  loadFarms(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('Farm API Data:', data);

        this.farms = data || [];

        console.log('Total Farms:', this.farms.length);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading farms:', error);
      }
    });
  }

  // Add or Update Farm
  save(): void {

    if (this.editing && this.editingId !== undefined) {

      this.service.update(this.editingId, this.farm).subscribe({
        next: () => {
          alert('Farm updated successfully!');
          this.reset();
          this.loadFarms();
        },
        error: (error) => {
          console.error('Error updating farm:', error);
          alert('Failed to update farm!');
        }
      });

    } else {

      this.service.add(this.farm).subscribe({
        next: (response) => {
          console.log('Farm Added:', response);

          alert('Farm added successfully!');
          this.reset();
          this.loadFarms();
        },
        error: (error) => {
          console.error('Error adding farm:', error);
          alert('Failed to add farm!');
        }
      });

    }
  }

  // Edit Farm
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

  // Delete Farm
  delete(id?: number): void {

    if (id === undefined) {
      return;
    }

    if (confirm('Are you sure you want to delete this farm?')) {

      this.service.delete(id).subscribe({
        next: () => {
          alert('Farm deleted successfully!');
          this.loadFarms();
        },
        error: (error) => {
          console.error('Error deleting farm:', error);
          alert('Failed to delete farm!');
        }
      });

    }
  }

  // Reset Form
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
