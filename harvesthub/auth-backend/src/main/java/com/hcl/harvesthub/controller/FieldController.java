package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.Field;
import com.hcl.harvesthub.service.FieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/field")
public class FieldController {

    @Autowired
    private FieldService service;

    // Insert one
    @PostMapping("/add")
    public Field add(@RequestBody Field field) {
        return service.save(field);
    }

    // Insert multiple
    @PostMapping("/addAll")
    public List<Field> addAll(@RequestBody List<Field> fields) {
        for (Field field : fields) {
            service.save(field);
        }
        return fields;
    }

    // Read all
    @GetMapping("/all")
    public List<Field> all() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/id/{id}")
    public Field getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public Field update(@PathVariable Long id,
                        @RequestBody Field field) {
        return service.update(id, field);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Field deleted successfully";
    }

    // Post by ID
    @PostMapping("/post/{id}")
    public Field postById(@PathVariable Long id) {
        return service.getById(id);
    }
}