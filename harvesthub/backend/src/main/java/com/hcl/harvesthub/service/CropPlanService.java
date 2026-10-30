package com.hcl.harvesthub.service;

import com.hcl.harvesthub.model.CropPlan;
import com.hcl.harvesthub.repository.CropPlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropPlanService {

    private final CropPlanRepository repository;

    public CropPlanService(CropPlanRepository repository) {
        this.repository = repository;
    }

    public CropPlan save(CropPlan cropPlan) {
        return repository.save(cropPlan);
    }

    public List<CropPlan> getAll() {
        return repository.findAll();
    }

    public CropPlan getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public CropPlan update(Long id, CropPlan cropPlan) {
        cropPlan.setId(id);
        return repository.save(cropPlan);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}