package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.Harvest;
import com.hcl.harvesthub.service.HarvestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/harvest")
public class HarvestController {

    @Autowired
    private HarvestService service;

    // Insert one
    @PostMapping("/add")
    public Harvest add(@RequestBody Harvest harvest) {
        return service.save(harvest);
    }

    // Insert multiple
    @PostMapping("/addAll")
    public List<Harvest> addAll(@RequestBody List<Harvest> harvests) {
        for (Harvest harvest : harvests) {
            service.save(harvest);
        }
        return harvests;
    }

    // Read all
    @GetMapping("/all")
    public List<Harvest> all() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/id/{id}")
    public Harvest getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Search by quality
    @GetMapping("/search")
    public List<Harvest> search(@RequestParam String quality) {
        return service.search(quality);
    }

    // Update
    @PutMapping("/update/{id}")
    public Harvest update(@PathVariable Long id,
                          @RequestBody Harvest harvest) {
        return service.update(id, harvest);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Harvest deleted successfully";
    }

    // Post by ID
    @PostMapping("/post/{id}")
    public Harvest postById(@PathVariable Long id) {
        return service.getById(id);
    }
}