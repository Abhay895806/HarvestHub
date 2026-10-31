import { Component, OnInit } from '@angular/core';
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

  constructor(private service: EquipmentService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe(data => {
      this.equipments = data;
    });
  }

  save(): void {

    if (this.editing && this.editingId) {

      this.service.update(this.editingId, this.equipment).subscribe(() => {
        alert('Equipment updated successfully');
        this.reset();
        this.load();
      });

    } else {

      this.service.add(this.equipment).subscribe(() => {
        alert('Equipment added successfully');
        this.reset();
        this.load();
      });

    }
  }

  edit(equipment: Equipment): void {

    this.equipment = {
      equipmentName: equipment.equipmentName,
      equipmentType: equipment.equipmentType,
      model: equipment.model,
      purchaseDate: equipment.purchaseDate,
      status: equipment.status
    };

    this.editing = true;
    this.editingId = equipment.id;
  }

  delete(id?: number): void {

    if (!id) return;

    if (confirm('Delete this equipment?')) {

      this.service.delete(id).subscribe(() => {
        alert('Equipment deleted successfully');
        this.load();
      });

    }
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
  }
}