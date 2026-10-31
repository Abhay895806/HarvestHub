package com.hcl.harvesthub.repository;

import com.hcl.harvesthub.model.RotationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RotationRecordRepository extends JpaRepository<RotationRecord, Long> {
}