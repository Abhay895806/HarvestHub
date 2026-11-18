package com.hcl.harvesthub.service;

import com.hcl.harvesthub.model.Maintenance;
import com.hcl.harvesthub.repository.MaintenanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceService {

    private final MaintenanceRepository repository;

    public MaintenanceService(MaintenanceRepository repository) {
        this.repository = repository;
    }

    public Maintenance save(Maintenance maintenance) {
        return repository.save(maintenance);
    }

    public List<Maintenance> getAll() {
        return repository.findAll();
    }

    public Maintenance getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Maintenance update(Long id, Maintenance maintenance) {
        maintenance.setId(id);
        return repository.save(maintenance);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}