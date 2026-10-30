import { Component, OnInit } from '@angular/core';
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

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.activityService.getAll().subscribe(data => {
      this.activities = data;
    });
  }

  saveActivity(): void {

    if (this.editing && this.editingId) {

      this.activityService.update(this.editingId, this.activity).subscribe(() => {
        alert('Activity updated successfully');
        this.resetForm();
        this.loadActivities();
      });

    } else {

      this.activityService.add(this.activity).subscribe(() => {
        alert('Activity added successfully');
        this.resetForm();
        this.loadActivities();
      });

    }
  }

  editActivity(activity: Activity): void {

    this.activity = {
      activityName: activity.activityName,
      fieldName: activity.fieldName,
      activityDate: activity.activityDate,
      description: activity.description,
      status: activity.status
    };

    this.editing = true;
    this.editingId = activity.id;
  }

  deleteActivity(id?: number): void {

    if (!id) return;

    if (confirm('Delete this activity?')) {

      this.activityService.delete(id).subscribe(() => {
        alert('Activity deleted successfully');
        this.loadActivities();
      });

    }
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
  }
}