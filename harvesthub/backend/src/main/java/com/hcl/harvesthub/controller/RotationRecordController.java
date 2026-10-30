package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.RotationRecord;
import com.hcl.harvesthub.service.RotationRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/rotation")
public class RotationRecordController {

    @Autowired
    private RotationRecordService service;

    // Insert one
    @PostMapping("/add")
    public RotationRecord add(@RequestBody RotationRecord rotationRecord) {
        return service.save(rotationRecord);
    }

    // Insert multiple
    @PostMapping("/addAll")
    public List<RotationRecord> addAll(
            @RequestBody List<RotationRecord> rotationRecords) {

        for (RotationRecord rotationRecord : rotationRecords) {
            service.save(rotationRecord);
        }

        return rotationRecords;
    }

    // Read all
    @GetMapping("/all")
    public List<RotationRecord> all() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/id/{id}")
    public RotationRecord getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public RotationRecord update(
            @PathVariable Long id,
            @RequestBody RotationRecord rotationRecord) {

        return service.update(id, rotationRecord);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Rotation record deleted successfully";
    }

    // Post by ID
    @PostMapping("/post/{id}")
    public RotationRecord postById(@PathVariable Long id) {
        return service.getById(id);
    }
}