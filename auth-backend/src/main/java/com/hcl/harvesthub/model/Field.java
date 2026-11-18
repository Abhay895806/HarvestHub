
package com.hcl.harvesthub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "FIELDS")
public class Field {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fieldName;
    private Double area;
    private String soilType;
    private String irrigationType;
    private String status;

    public Field() {
    }

    public Field(Long id, String fieldName, Double area,
                 String soilType, String irrigationType, String status) {
        this.id = id;
        this.fieldName = fieldName;
        this.area = area;
        this.soilType = soilType;
        this.irrigationType = irrigationType;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public String getSoilType() {
        return soilType;
    }

    public void setSoilType(String soilType) {
        this.soilType = soilType;
    }

    public String getIrrigationType() {
        return irrigationType;
    }

    public void setIrrigationType(String irrigationType) {
        this.irrigationType = irrigationType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
