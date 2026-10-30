import { Component, OnInit } from '@angular/core';
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

  constructor(private service: CropPlanService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe(data => {
      this.cropPlans = data;
    });
  }

  save(): void {
    if (this.editing && this.editingId) {
      this.service.update(this.editingId, this.cropPlan).subscribe(() => {
        alert('Crop plan updated successfully');
        this.reset();
        this.load();
      });
    } else {
      this.service.add(this.cropPlan).subscribe(() => {
        alert('Crop plan added successfully');
        this.reset();
        this.load();
      });
    }
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
    if (!id) return;

    if (confirm('Delete this crop plan?')) {
      this.service.delete(id).subscribe(() => {
        alert('Crop plan deleted successfully');
        this.load();
      });
    }
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
  }
}