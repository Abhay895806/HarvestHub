
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

    // Save Field
    public Field save(Field field) {
        return repository.save(field);
    }

    // Get All Fields
    public List<Field> getAll() {
        return repository.findAll();
    }

    // Get Field By ID
    public Field getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Update Field
    public Field update(Long id, Field field) {

        Field existingField = repository.findById(id).orElse(null);

        if (existingField == null) {
            return null;
        }

        existingField.setFieldName(field.getFieldName());
        existingField.setArea(field.getArea());
        existingField.setSoilType(field.getSoilType());
        existingField.setIrrigationType(field.getIrrigationType());
        existingField.setStatus(field.getStatus());

        return repository.save(existingField);
    }

    // Delete Field
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
