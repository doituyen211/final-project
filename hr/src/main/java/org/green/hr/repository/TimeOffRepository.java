package org.green.hr.repository;

import org.green.hr.entity.TimeOff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeOffRepository extends JpaRepository<TimeOff, Long> {
}
