
package com.hcl.harvesthub.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "HARVESTS")
public class Harvest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate harvestDate;
    private Double quantity;
    private String unit;
    private Double sellingPrice;
    private String quality;

    public Harvest() {}

    public Harvest(Long id, LocalDate harvestDate, Double quantity,
                   String unit, Double sellingPrice, String quality) {
        this.id = id;
        this.harvestDate = harvestDate;
        this.quantity = quantity;
        this.unit = unit;
        this.sellingPrice = sellingPrice;
        this.quality = quality;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getHarvestDate() { return harvestDate; }
    public void setHarvestDate(LocalDate harvestDate) { this.harvestDate = harvestDate; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public Double getSellingPrice() { return sellingPrice; }
    public void setSellingPrice(Double sellingPrice) { this.sellingPrice = sellingPrice; }

    public String getQuality() { return quality; }
    public void setQuality(String quality) { this.quality = quality; }
}
