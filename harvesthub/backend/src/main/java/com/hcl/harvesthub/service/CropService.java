package com.hcl.harvesthub.service;

import com.hcl.harvesthub.model.Crop;
import com.hcl.harvesthub.repository.CropRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropService {

    private final CropRepository repository;

    public CropService(CropRepository repository) {
        this.repository = repository;
    }

    public Crop save(Crop crop) {
        return repository.save(crop);
    }

    public List<Crop> getAll() {
        return repository.findAll();
    }

    public Crop getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Crop update(Long id, Crop crop) {
        crop.setId(id);
        return repository.save(crop);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}