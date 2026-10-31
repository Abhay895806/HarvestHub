package com.hcl.harvesthub.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "MAINTENANCE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    public void setId(Long id) {
        this.id = id;
    }
}