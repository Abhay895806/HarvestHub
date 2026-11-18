
package com.hcl.harvesthub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "FARM_PROFILES")
public class FarmProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String farmName;
    private String ownerName;
    private String location;
    private Double totalArea;
    private String areaUnit;

    public FarmProfile() {
    }

    public FarmProfile(Long id, String farmName, String ownerName,
                       String location, Double totalArea, String areaUnit) {
        this.id = id;
        this.farmName = farmName;
        this.ownerName = ownerName;
        this.location = location;
        this.totalArea = totalArea;
        this.areaUnit = areaUnit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFarmName() {
        return farmName;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getTotalArea() {
        return totalArea;
    }

    public void setTotalArea(Double totalArea) {
        this.totalArea = totalArea;
    }

    public String getAreaUnit() {
        return areaUnit;
    }

    public void setAreaUnit(String areaUnit) {
        this.areaUnit = areaUnit;
    }
}
