package com.hcl.harvesthub.controller;

import com.hcl.harvesthub.model.Expense;
import com.hcl.harvesthub.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/expense")
public class ExpenseController {

    @Autowired
    private ExpenseService service;

    // Insert one
    @PostMapping("/add")
    public Expense add(@RequestBody Expense expense) {
        return service.save(expense);
    }

    // Insert multiple
    @PostMapping("/addAll")
    public List<Expense> addAll(@RequestBody List<Expense> expenses) {
        for (Expense expense : expenses) {
            service.save(expense);
        }
        return expenses;
    }

    // Read all
    @GetMapping("/all")
    public List<Expense> all() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/id/{id}")
    public Expense getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public Expense update(@PathVariable Long id,
                          @RequestBody Expense expense) {
        return service.update(id, expense);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Expense deleted successfully";
    }

    // Post by ID
    @PostMapping("/post/{id}")
    public Expense postById(@PathVariable Long id) {
        return service.getById(id);
    }
}