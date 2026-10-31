package com.hcl.harvesthub.repository;

import com.hcl.harvesthub.model.FarmProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmProfileRepository extends JpaRepository<FarmProfile, Long> {
}