
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';

import { Farm } from './pages/farm/farm';
import { Field } from './pages/field/field';
import { Crop } from './pages/crop/crop';
import { Harvest } from './pages/harvest/harvest';

import { ActivityComponent } from './pages/activity/activity';
import { CropPlanComponent } from './pages/crop-plan/crop-plan';
import { EquipmentComponent } from './pages/equipment/equipment';

import { Expense } from './pages/expense/expense';
import { Maintenance } from './pages/maintenance/maintenance';
import { RotationRecord } from './pages/rotation-record/rotation-record';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [

  { path: '', component: Home },

  { path: 'login', component: Login },

  { path: 'register', component: Register },

  { path: 'dashboard', component: Dashboard },

  { path: 'farm', component: Farm },

  { path: 'field', component: Field },

  { path: 'crop', component: Crop },

  { path: 'harvest', component: Harvest },

  { path: 'activity', component: ActivityComponent },

  { path: 'crop-plan', component: CropPlanComponent },

  { path: 'equipment', component: EquipmentComponent },

  { path: 'expense', component: Expense },

  { path: 'maintenance', component: Maintenance },

  { path: 'rotation-record', component: RotationRecord },

  { path: '**', redirectTo: '' }

];
