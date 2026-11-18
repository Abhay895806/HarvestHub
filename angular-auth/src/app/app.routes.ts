
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
import { authGuard } from './service/auth.guard';

export const routes: Routes = [

  { path: '', component: Home },

  { path: 'login', component: Login },

  { path: 'register', component: Register },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

  { path: 'farm', component: Farm, canActivate: [authGuard] },

  { path: 'field', component: Field, canActivate: [authGuard] },

  { path: 'crop', component: Crop, canActivate: [authGuard] },

  { path: 'harvest', component: Harvest, canActivate: [authGuard] },

  { path: 'activity', component: ActivityComponent, canActivate: [authGuard] },

  { path: 'crop-plan', component: CropPlanComponent, canActivate: [authGuard] },

  { path: 'equipment', component: EquipmentComponent, canActivate: [authGuard] },

  { path: 'expense', component: Expense, canActivate: [authGuard] },

  { path: 'maintenance', component: Maintenance, canActivate: [authGuard] },

  { path: 'rotation-record', component: RotationRecord, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }

];
