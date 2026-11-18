
package com.hcl.harvesthub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "CROPS")
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cropName;
    private String cropType;
    private String season;
    private String duration;

    public Crop() {}

    public Crop(Long id, String cropName, String cropType,
                String season, String duration) {
        this.id = id;
        this.cropName = cropName;
        this.cropType = cropType;
        this.season = season;
        this.duration = duration;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
}
