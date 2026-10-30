package com.hcl.harvesthub.service;

import com.hcl.harvesthub.model.Expense;
import com.hcl.harvesthub.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public Expense save(Expense expense) {
        return repository.save(expense);
    }

    public List<Expense> getAll() {
        return repository.findAll();
    }

    public Expense getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Expense update(Long id, Expense expense) {
        expense.setId(id);
        return repository.save(expense);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}