package com.hcl.harvesthub.service;

import com.hcl.harvesthub.model.RotationRecord;
import com.hcl.harvesthub.repository.RotationRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RotationRecordService {

    private final RotationRecordRepository repository;

    public RotationRecordService(RotationRecordRepository repository) {
        this.repository = repository;
    }

    public RotationRecord save(RotationRecord rotationRecord) {
        return repository.save(rotationRecord);
    }

    public List<RotationRecord> getAll() {
        return repository.findAll();
    }

    public RotationRecord getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public RotationRecord update(Long id, RotationRecord rotationRecord) {
        rotationRecord.setId(id);
        return repository.save(rotationRecord);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}