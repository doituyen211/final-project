package org.green.hr.repository;

import org.green.hr.entity.WorkProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkProcessRepository extends JpaRepository<WorkProcess, Long> {
}
