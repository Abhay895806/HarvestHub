
package com.hcl.harvesthub.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "ROTATION_RECORDS")
public class RotationRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fieldName;
    private String previousCrop;
    private String nextCrop;
    private LocalDate rotationDate;
    private String season;

    public RotationRecord() {}

    public RotationRecord(Long id, String fieldName, String previousCrop,
                          String nextCrop, LocalDate rotationDate, String season) {
        this.id = id;
        this.fieldName = fieldName;
        this.previousCrop = previousCrop;
        this.nextCrop = nextCrop;
        this.rotationDate = rotationDate;
        this.season = season;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFieldName() { return fieldName; }
    public void setFieldName(String fieldName) { this.fieldName = fieldName; }

    public String getPreviousCrop() { return previousCrop; }
    public void setPreviousCrop(String previousCrop) { this.previousCrop = previousCrop; }

    public String getNextCrop() { return nextCrop; }
    public void setNextCrop(String nextCrop) { this.nextCrop = nextCrop; }

    public LocalDate getRotationDate() { return rotationDate; }
    public void setRotationDate(LocalDate rotationDate) { this.rotationDate = rotationDate; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }
}
