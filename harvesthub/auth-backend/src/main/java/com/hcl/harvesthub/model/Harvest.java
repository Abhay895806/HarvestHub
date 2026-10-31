package com.hcl.harvesthub.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "HARVESTS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Harvest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate harvestDate;
    private Double quantity;
    private String unit;
    private Double sellingPrice;
    private String quality;

    public void setId(Long id) {
        this.id = id;
    }
}