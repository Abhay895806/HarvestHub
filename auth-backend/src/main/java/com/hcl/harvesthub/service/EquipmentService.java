package com.hcl.harvesthub.service;

import com.hcl.harvesthub.model.Equipment;
import com.hcl.harvesthub.repository.EquipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {

    private final EquipmentRepository repository;

    public EquipmentService(EquipmentRepository repository) {
        this.repository = repository;
    }

    public Equipment save(Equipment equipment) {
        return repository.save(equipment);
    }

    public List<Equipment> getAll() {
        return repository.findAll();
    }

    public Equipment getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Equipment update(Long id, Equipment equipment) {
        equipment.setId(id);
        return repository.save(equipment);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}