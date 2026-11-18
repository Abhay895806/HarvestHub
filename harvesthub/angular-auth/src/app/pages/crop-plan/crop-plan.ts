import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CropPlanService } from '../../services/crop-plan.service';
import { CropPlan } from '../../models/crop-plan';

@Component({
  selector: 'app-crop-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crop-plan.html',
  styleUrl: './crop-plan.css'
})
export class CropPlanComponent implements OnInit {
  cropPlans: CropPlan[] = [];

  cropPlan: CropPlan = {
    fieldName: '',
    cropName: '',
    sowingDate: '',
    expectedHarvestDate: '',
    status: ''
  };

  editing = false;
  editingId?: number;
  saving = false;

  constructor(
    private service: CropPlanService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe({
      next: data => {
        this.cropPlans = data || [];
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error loading crop plans:', error);
        this.cropPlans = [];
        this.cdr.detectChanges();
      }
    });
  }

  save(): void {
    if (this.saving) return;

    this.saving = true;

    const request = this.editing && this.editingId !== undefined
      ? this.service.update(this.editingId, this.cropPlan)
      : this.service.add(this.cropPlan);

    request.subscribe({
      next: () => {
        alert(this.editing ? 'Crop plan updated successfully' : 'Crop plan added successfully');
        this.reset();
        this.load();
      },
      error: error => {
        console.error('Error saving crop plan:', error);
        alert('Failed to save crop plan');
        this.saving = false;
      }
    });
  }

  edit(plan: CropPlan): void {
    this.cropPlan = {
      fieldName: plan.fieldName,
      cropName: plan.cropName,
      sowingDate: plan.sowingDate,
      expectedHarvestDate: plan.expectedHarvestDate,
      status: plan.status
    };

    this.editing = true;
    this.editingId = plan.id;
  }

  delete(id?: number): void {
    if (id === undefined || !confirm('Delete this crop plan?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        alert('Crop plan deleted successfully');
        this.load();
      },
      error: error => {
        console.error('Error deleting crop plan:', error);
        alert('Failed to delete crop plan');
      }
    });
  }

  reset(): void {
    this.cropPlan = {
      fieldName: '',
      cropName: '',
      sowingDate: '',
      expectedHarvestDate: '',
      status: ''
    };

    this.editing = false;
    this.editingId = undefined;
    this.saving = false;
  }
}