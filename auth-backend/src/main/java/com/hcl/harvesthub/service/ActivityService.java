package com.hcl.harvesthub.service;

import com.hcl.harvesthub.model.Activity;
import com.hcl.harvesthub.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository repository;

    public ActivityService(ActivityRepository repository) {
        this.repository = repository;
    }

    public Activity save(Activity activity) {
        return repository.save(activity);
    }

    public List<Activity> getAll() {
        return repository.findAll();
    }

    public Activity getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Activity update(Long id, Activity activity) {
        activity.setId(id);
        return repository.save(activity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}