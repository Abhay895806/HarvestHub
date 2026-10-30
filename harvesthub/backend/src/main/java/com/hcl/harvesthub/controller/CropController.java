package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.Crop;
import com.hcl.harvesthub.service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/crop")
public class CropController {

    @Autowired
    private CropService service;

    // Insert one
    @PostMapping("/add")
    public Crop add(@RequestBody Crop crop) {
        return service.save(crop);
    }

    // Insert multiple
    @PostMapping("/addAll")
    public List<Crop> addAll(@RequestBody List<Crop> crops) {
        for (Crop crop : crops) {
            service.save(crop);
        }
        return crops;
    }

    // Read all
    @GetMapping("/all")
    public List<Crop> all() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/id/{id}")
    public Crop getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public Crop update(@PathVariable Long id,
                       @RequestBody Crop crop) {
        return service.update(id, crop);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Crop deleted successfully";
    }

    // Post by ID
    @PostMapping("/post/{id}")
    public Crop postById(@PathVariable Long id) {
        return service.getById(id);
    }
}