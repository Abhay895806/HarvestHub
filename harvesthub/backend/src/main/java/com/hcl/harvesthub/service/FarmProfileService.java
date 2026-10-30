package com.hcl.harvesthub.service;

import com.hcl.harvesthub.model.FarmProfile;
import com.hcl.harvesthub.repository.FarmProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmProfileService {

    private final FarmProfileRepository repository;

    public FarmProfileService(FarmProfileRepository repository) {
        this.repository = repository;
    }

    public FarmProfile save(FarmProfile farmProfile) {
        return repository.save(farmProfile);
    }

    public List<FarmProfile> getAll() {
        return repository.findAll();
    }

    public FarmProfile getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public FarmProfile update(Long id, FarmProfile farmProfile) {
        farmProfile.setId(id);
        return repository.save(farmProfile);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}