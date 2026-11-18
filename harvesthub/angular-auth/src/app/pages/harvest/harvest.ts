import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private service: HarvestService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadHarvests();
  }

  loadHarvests(): void {
    this.service.getAll().subscribe({
      next: data => {
        this.harvests = data || [];
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error loading harvests:', error);
        this.harvests = [];
        this.cdr.detectChanges();
      }
    });
  }

  addHarvest(): void {
    if (!this.harvest.harvestDate || !this.harvest.unit || !this.harvest.quality) {
      alert('Please fill all required fields');
      return;
    }

    const request = this.editingId !== null
      ? this.service.update(this.editingId!, this.harvest)
      : this.service.add(this.harvest);

    request.subscribe({
      next: () => {
        alert(this.editingId !== null
          ? 'Harvest updated successfully'
          : 'Harvest added successfully');

        this.resetForm();
        this.loadHarvests();
      },
      error: error => {
        console.error('Error saving harvest:', error);
        alert('Failed to save harvest');
      }
    });
  }

  editHarvest(item: HarvestModel): void {
    this.editingId = item.id ?? null;

    this.harvest = {
      harvestDate: item.harvestDate,
      quantity: item.quantity,
      unit: item.unit,
      sellingPrice: item.sellingPrice,
      quality: item.quality
    };
  }

  deleteHarvest(id: number): void {
    if (!confirm('Are you sure you want to delete this harvest?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        alert('Harvest deleted successfully');
        this.loadHarvests();
      },
      error: error => {
        console.error('Error deleting harvest:', error);
        alert('Failed to delete harvest');
      }
    });
  }

  searchHarvest(): void {
    const query = this.searchQuality.trim();

    if (!query) {
      this.loadHarvests();
      return;
    }

    this.service.search(query).subscribe({
      next: data => {
        this.harvests = data || [];
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error searching harvests:', error);
        alert('Failed to search harvests');
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