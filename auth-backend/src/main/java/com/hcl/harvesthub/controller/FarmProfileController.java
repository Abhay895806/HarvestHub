package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.FarmProfile;
import com.hcl.harvesthub.service.FarmProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/farm")
public class FarmProfileController {

    @Autowired
    private FarmProfileService service;

    // Insert one
    @PostMapping("/add")
    public FarmProfile add(@RequestBody FarmProfile farmProfile) {
        return service.save(farmProfile);
    }

    // Insert multiple
    @PostMapping("/addAll")
    public List<FarmProfile> addAll(@RequestBody List<FarmProfile> farms) {
        for (FarmProfile farm : farms) {
            service.save(farm);
        }
        return farms;
    }

    // Read all
    @GetMapping("/all")
    public List<FarmProfile> all() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/id/{id}")
    public FarmProfile getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public FarmProfile update(@PathVariable Long id,
                              @RequestBody FarmProfile farmProfile) {
        return service.update(id, farmProfile);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Farm profile deleted successfully";
    }

    // Post by ID
    @PostMapping("/post/{id}")
    public FarmProfile postById(@PathVariable Long id) {
        return service.getById(id);
    }
}