package com.hcl.harvesthub.service;

import com.hcl.harvesthub.model.Harvest;
import com.hcl.harvesthub.repository.HarvestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HarvestService {

    private final HarvestRepository repository;

    public HarvestService(HarvestRepository repository) {
        this.repository = repository;
    }

    // Create
    public Harvest save(Harvest harvest) {
        return repository.save(harvest);
    }

    // Read All
    public List<Harvest> getAll() {
        return repository.findAll();
    }

    // Read By ID
    public Harvest getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Search
    public List<Harvest> search(String quality) {
        return repository.findByQualityIgnoreCase(quality);
    }

    // Update
    public Harvest update(Long id, Harvest harvest) {
        harvest.setId(id);
        return repository.save(harvest);
    }

    // Delete
    public void delete(Long id) {
        repository.deleteById(id);
    }
}