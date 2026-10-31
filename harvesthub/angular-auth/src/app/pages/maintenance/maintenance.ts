import { Component, OnInit } from '@angular/core';
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

  constructor(private service: MaintenanceService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.maintenances = data;
      },
      error: (error) => {
        console.error('Error loading maintenance:', error);
      }
    });
  }

  save(): void {

    if (this.editing && this.editingId !== undefined) {

      this.service.update(this.editingId, this.maintenance).subscribe({
        next: () => {
          alert('Maintenance updated successfully');
          this.reset();
          this.load();
        },
        error: (error) => {
          console.error('Error updating maintenance:', error);
          alert('Failed to update maintenance');
        }
      });

    } else {

      this.service.add(this.maintenance).subscribe({
        next: () => {
          alert('Maintenance added successfully');
          this.reset();
          this.load();
        },
        error: (error) => {
          console.error('Error adding maintenance:', error);
          alert('Failed to add maintenance');
        }
      });

    }
  }

  edit(maintenance: MaintenanceModel): void {

    this.maintenance = {
      equipmentName: maintenance.equipmentName,
      maintenanceDate: maintenance.maintenanceDate,
      nextMaintenanceDate: maintenance.nextMaintenanceDate,
      maintenanceType: maintenance.maintenanceType,
      cost: maintenance.cost,
      status: maintenance.status
    };

    this.editing = true;
    this.editingId = maintenance.id;
  }

  delete(id?: number): void {

    if (id === undefined) {
      return;
    }

    if (confirm('Delete this maintenance record?')) {

      this.service.delete(id).subscribe({
        next: () => {
          alert('Maintenance deleted successfully');
          this.load();
        },
        error: (error) => {
          console.error('Error deleting maintenance:', error);
          alert('Failed to delete maintenance');
        }
      });

    }
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
  }
}