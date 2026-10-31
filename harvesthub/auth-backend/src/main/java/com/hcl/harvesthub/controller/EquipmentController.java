package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.Equipment;
import com.hcl.harvesthub.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/equipment")
public class EquipmentController {

    @Autowired
    private EquipmentService service;

    // Insert one
    @PostMapping("/add")
    public Equipment add(@RequestBody Equipment equipment) {
        return service.save(equipment);
    }

    // Insert multiple
    @PostMapping("/addAll")
    public List<Equipment> addAll(@RequestBody List<Equipment> equipments) {
        for (Equipment equipment : equipments) {
            service.save(equipment);
        }
        return equipments;
    }

    // Read all
    @GetMapping("/all")
    public List<Equipment> all() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/id/{id}")
    public Equipment getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public Equipment update(@PathVariable Long id,
                            @RequestBody Equipment equipment) {
        return service.update(id, equipment);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Equipment deleted successfully";
    }

    // Post by ID
    @PostMapping("/post/{id}")
    public Equipment postById(@PathVariable Long id) {
        return service.getById(id);
    }
}