export interface Maintenance {
  id?: number;
  equipmentName: string;
  maintenanceDate: string;
  nextMaintenanceDate: string;
  maintenanceType: string;
  cost: number;
  status: string;
}