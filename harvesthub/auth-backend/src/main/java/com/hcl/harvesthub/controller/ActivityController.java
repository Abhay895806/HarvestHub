package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.Activity;
import com.hcl.harvesthub.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/activity")
public class ActivityController {

    @Autowired
    private ActivityService service;

    // Insert one
    @PostMapping("/add")
    public Activity add(@RequestBody Activity activity) {
        return service.save(activity);
    }

    // Insert multiple
    @PostMapping("/addAll")
    public List<Activity> addAll(@RequestBody List<Activity> activities) {
        for (Activity activity : activities) {
            service.save(activity);
        }
        return activities;
    }

    // Read all
    @GetMapping("/all")
    public List<Activity> all() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/id/{id}")
    public Activity getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public Activity update(@PathVariable Long id,
                           @RequestBody Activity activity) {
        return service.update(id, activity);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Activity deleted successfully";
    }

    // Post by ID
    @PostMapping("/post/{id}")
    public Activity postById(@PathVariable Long id) {
        return service.getById(id);
    }
}