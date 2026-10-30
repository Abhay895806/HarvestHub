package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.Maintenance;
import com.hcl.harvesthub.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService service;

    // Insert one
    @PostMapping("/add")
    public Maintenance add(@RequestBody Maintenance maintenance) {
        return service.save(maintenance);
    }

    // Insert multiple
    @PostMapping("/addAll")
    public List<Maintenance> addAll(@RequestBody List<Maintenance> maintenances) {
        for (Maintenance maintenance : maintenances) {
            service.save(maintenance);
        }
        return maintenances;
    }

    // Read all
    @GetMapping("/all")
    public List<Maintenance> all() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/id/{id}")
    public Maintenance getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public Maintenance update(@PathVariable Long id,
                              @RequestBody Maintenance maintenance) {
        return service.update(id, maintenance);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Maintenance deleted successfully";
    }

    // Post by ID
    @PostMapping("/post/{id}")
    public Maintenance postById(@PathVariable Long id) {
        return service.getById(id);
    }
}