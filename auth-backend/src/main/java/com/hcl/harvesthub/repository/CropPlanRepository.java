package com.hcl.harvesthub.repository;

import com.hcl.harvesthub.model.CropPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropPlanRepository extends JpaRepository<CropPlan, Long> {
}