package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.CropPlan;
import com.hcl.harvesthub.service.CropPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/crop-plan")
public class CropPlanController {

    @Autowired
    private CropPlanService service;

    // Insert one
    @PostMapping("/add")
    public CropPlan add(@RequestBody CropPlan cropPlan) {
        return service.save(cropPlan);
    }

    // Insert multiple
    @PostMapping("/addAll")
    public List<CropPlan> addAll(@RequestBody List<CropPlan> cropPlans) {
        for (CropPlan cropPlan : cropPlans) {
            service.save(cropPlan);
        }
        return cropPlans;
    }

    // Read all
    @GetMapping("/all")
    public List<CropPlan> all() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/id/{id}")
    public CropPlan getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public CropPlan update(@PathVariable Long id,
                           @RequestBody CropPlan cropPlan) {
        return service.update(id, cropPlan);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Crop plan deleted successfully";
    }

    // Post by ID
    @PostMapping("/post/{id}")
    public CropPlan postById(@PathVariable Long id) {
        return service.getById(id);
    }
}