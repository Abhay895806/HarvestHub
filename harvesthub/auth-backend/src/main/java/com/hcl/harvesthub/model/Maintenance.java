
package com.hcl.harvesthub.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "MAINTENANCE")
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String equipmentName;
    private LocalDate maintenanceDate;
    private LocalDate nextMaintenanceDate;
    private String maintenanceType;
    private Double cost;
    private String status;

    public Maintenance() {}

    public Maintenance(Long id, String equipmentName,
                       LocalDate maintenanceDate,
                       LocalDate nextMaintenanceDate,
                       String maintenanceType, Double cost, String status) {
        this.id = id;
        this.equipmentName = equipmentName;
        this.maintenanceDate = maintenanceDate;
        this.nextMaintenanceDate = nextMaintenanceDate;
        this.maintenanceType = maintenanceType;
        this.cost = cost;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEquipmentName() { return equipmentName; }
    public void setEquipmentName(String equipmentName) { this.equipmentName = equipmentName; }

    public LocalDate getMaintenanceDate() { return maintenanceDate; }
    public void setMaintenanceDate(LocalDate maintenanceDate) { this.maintenanceDate = maintenanceDate; }

    public LocalDate getNextMaintenanceDate() { return nextMaintenanceDate; }
    public void setNextMaintenanceDate(LocalDate nextMaintenanceDate) {
        this.nextMaintenanceDate = nextMaintenanceDate;
    }

    public String getMaintenanceType() { return maintenanceType; }
    public void setMaintenanceType(String maintenanceType) { this.maintenanceType = maintenanceType; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
