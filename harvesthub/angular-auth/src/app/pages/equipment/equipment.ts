import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from '../../models/equipment';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipment.html',
  styleUrl: './equipment.css'
})
export class EquipmentComponent implements OnInit {
  equipments: Equipment[] = [];

  equipment: Equipment = {
    equipmentName: '',
    equipmentType: '',
    model: '',
    purchaseDate: '',
    status: ''
  };

  editing = false;
  editingId?: number;
  saving = false;

  constructor(
    private service: EquipmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe({
      next: data => {
        this.equipments = data || [];
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error loading equipment:', error);
        this.equipments = [];
        this.cdr.detectChanges();
      }
    });
  }

  save(): void {
    if (this.saving) return;

    this.saving = true;

    const request = this.editing && this.editingId !== undefined
      ? this.service.update(this.editingId, this.equipment)
      : this.service.add(this.equipment);

    request.subscribe({
      next: () => {
        alert(this.editing ? 'Equipment updated successfully' : 'Equipment added successfully');
        this.reset();
        this.load();
      },
      error: error => {
        console.error('Error saving equipment:', error);
        alert('Failed to save equipment');
        this.saving = false;
      }
    });
  }

  edit(item: Equipment): void {
    this.equipment = {
      equipmentName: item.equipmentName,
      equipmentType: item.equipmentType,
      model: item.model,
      purchaseDate: item.purchaseDate,
      status: item.status
    };

    this.editing = true;
    this.editingId = item.id;
  }

  delete(id?: number): void {
    if (id === undefined || !confirm('Delete this equipment?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        alert('Equipment deleted successfully');
        this.load();
      },
      error: error => {
        console.error('Error deleting equipment:', error);
        alert('Failed to delete equipment');
      }
    });
  }

  reset(): void {
    this.equipment = {
      equipmentName: '',
      equipmentType: '',
      model: '',
      purchaseDate: '',
      status: ''
    };

    this.editing = false;
    this.editingId = undefined;
    this.saving = false;
  }
}