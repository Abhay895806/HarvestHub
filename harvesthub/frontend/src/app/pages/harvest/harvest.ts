import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HarvestService } from '../../services/harvest.service';
import { Harvest as HarvestModel } from '../../models/harvest';

@Component({
  selector: 'app-harvest',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './harvest.html',
  styleUrl: './harvest.css'
})
export class Harvest implements OnInit {

  harvests: HarvestModel[] = [];

  harvest: HarvestModel = {
    harvestDate: '',
    quantity: 0,
    unit: '',
    sellingPrice: 0,
    quality: ''
  };

  editingId: number | null = null;

  searchQuality = '';

  constructor(private harvestService: HarvestService) {}

  ngOnInit(): void {
    this.loadHarvests();
  }

  loadHarvests(): void {
    this.harvestService.getAll().subscribe({
      next: (data) => {
        this.harvests = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addHarvest(): void {

    if (
      !this.harvest.harvestDate ||
      !this.harvest.unit ||
      !this.harvest.quality
    ) {
      alert('Please fill all required fields');
      return;
    }

    if (this.editingId !== null) {

      this.harvestService
        .update(this.editingId, this.harvest)
        .subscribe({
          next: () => {
            alert('Harvest updated successfully');
            this.resetForm();
            this.loadHarvests();
          },
          error: (error) => {
            console.error(error);
          }
        });

    } else {

      this.harvestService
        .add(this.harvest)
        .subscribe({
          next: () => {
            alert('Harvest added successfully');
            this.resetForm();
            this.loadHarvests();
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
  }

  editHarvest(harvest: HarvestModel): void {

    this.editingId = harvest.id ?? null;

    this.harvest = {
      harvestDate: harvest.harvestDate,
      quantity: harvest.quantity,
      unit: harvest.unit,
      sellingPrice: harvest.sellingPrice,
      quality: harvest.quality
    };
  }

  deleteHarvest(id: number): void {

    if (confirm('Are you sure you want to delete this harvest?')) {

      this.harvestService.delete(id).subscribe({
        next: () => {
          alert('Harvest deleted successfully');
          this.loadHarvests();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  searchHarvest(): void {

    if (!this.searchQuality.trim()) {
      this.loadHarvests();
      return;
    }

    this.harvestService
      .search(this.searchQuality)
      .subscribe({
        next: (data) => {
          this.harvests = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  resetForm(): void {

    this.harvest = {
      harvestDate: '',
      quantity: 0,
      unit: '',
      sellingPrice: 0,
      quality: ''
    };

    this.editingId = null;
  }
}