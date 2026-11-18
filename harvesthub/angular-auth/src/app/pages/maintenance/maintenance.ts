import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaintenanceService } from '../../services/maintenance.service';
import { Maintenance as MaintenanceModel } from '../../models/maintenance';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css'
})
export class Maintenance implements OnInit {
  maintenances: MaintenanceModel[] = [];

  maintenance: MaintenanceModel = {
    equipmentName: '',
    maintenanceDate: '',
    nextMaintenanceDate: '',
    maintenanceType: '',
    cost: 0,
    status: ''
  };

  editing = false;
  editingId?: number;
  saving = false;

  constructor(
    private service: MaintenanceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe({
      next: data => {
        this.maintenances = data || [];
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error loading maintenance:', error);
        this.maintenances = [];
        this.cdr.detectChanges();
      }
    });
  }

  save(): void {
    if (this.saving) return;

    this.saving = true;

    const request = this.editing && this.editingId !== undefined
      ? this.service.update(this.editingId, this.maintenance)
      : this.service.add(this.maintenance);

    request.subscribe({
      next: () => {
        alert(this.editing
          ? 'Maintenance updated successfully'
          : 'Maintenance added successfully');

        this.reset();
        this.load();
      },
      error: error => {
        console.error('Error saving maintenance:', error);
        alert('Failed to save maintenance');
        this.saving = false;
      }
    });
  }

  edit(item: MaintenanceModel): void {
    this.maintenance = {
      equipmentName: item.equipmentName,
      maintenanceDate: item.maintenanceDate,
      nextMaintenanceDate: item.nextMaintenanceDate,
      maintenanceType: item.maintenanceType,
      cost: item.cost,
      status: item.status
    };

    this.editing = true;
    this.editingId = item.id;
  }

  delete(id?: number): void {
    if (id === undefined || !confirm('Delete this maintenance record?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        alert('Maintenance deleted successfully');
        this.load();
      },
      error: error => {
        console.error('Error deleting maintenance:', error);
        alert('Failed to delete maintenance');
      }
    });
  }

  reset(): void {
    this.maintenance = {
      equipmentName: '',
      maintenanceDate: '',
      nextMaintenanceDate: '',
      maintenanceType: '',
      cost: 0,
      status: ''
    };

    this.editing = false;
    this.editingId = undefined;
    this.saving = false;
  }
}