package com.hcl.harvesthub.repository;

import com.hcl.harvesthub.model.Harvest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HarvestRepository extends JpaRepository<Harvest, Long> {

    List<Harvest> findByQualityIgnoreCase(String quality);
}