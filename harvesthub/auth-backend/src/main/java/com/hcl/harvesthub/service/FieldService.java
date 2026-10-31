package com.hcl.harvesthub.service;

import com.hcl.harvesthub.model.Field;
import com.hcl.harvesthub.repository.FieldRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldService {

    private final FieldRepository repository;

    public FieldService(FieldRepository repository) {
        this.repository = repository;
    }

    public Field save(Field field) {
        return repository.save(field);
    }

    public List<Field> getAll() {
        return repository.findAll();
    }

    public Field getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Field update(Long id, Field field) {
        field.setId(id);
        return repository.save(field);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}