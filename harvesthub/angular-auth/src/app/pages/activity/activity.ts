import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity.html',
  styleUrl: './activity.css'
})
export class ActivityComponent implements OnInit {
  activities: Activity[] = [];
  activity: Activity = {
    activityName: '',
    fieldName: '',
    activityDate: '',
    description: '',
    status: ''
  };

  editing = false;
  editingId?: number;
  saving = false;

  constructor(
    private service: ActivityService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.service.getAll().subscribe({
      next: data => {
        this.activities = data || [];
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error loading activities:', error);
        this.activities = [];
        this.cdr.detectChanges();
      }
    });
  }

  saveActivity(): void {
    if (this.saving) return;

    this.saving = true;

    const request = this.editing && this.editingId !== undefined
      ? this.service.update(this.editingId, this.activity)
      : this.service.add(this.activity);

    request.subscribe({
      next: () => {
        alert(this.editing ? 'Activity updated successfully' : 'Activity added successfully');
        this.resetForm();
        this.loadActivities();
      },
      error: error => {
        console.error('Error saving activity:', error);
        alert('Failed to save activity');
        this.saving = false;
      }
    });
  }

  editActivity(item: Activity): void {
    this.activity = {
      activityName: item.activityName,
      fieldName: item.fieldName,
      activityDate: item.activityDate,
      description: item.description,
      status: item.status
    };

    this.editing = true;
    this.editingId = item.id;
  }

  deleteActivity(id?: number): void {
    if (id === undefined || !confirm('Delete this activity?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        alert('Activity deleted successfully');
        this.loadActivities();
      },
      error: error => {
        console.error('Error deleting activity:', error);
        alert('Failed to delete activity');
      }
    });
  }

  resetForm(): void {
    this.activity = {
      activityName: '',
      fieldName: '',
      activityDate: '',
      description: '',
      status: ''
    };

    this.editing = false;
    this.editingId = undefined;
    this.saving = false;
  }
}