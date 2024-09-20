package org.green.hr.repository;

import java.util.Optional;
import org.green.hr.entity.Employee;
import org.green.hr.entity.Overtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OverTimeRepository extends JpaRepository<Overtime, Long> {

  Optional<Overtime> findById(long id);
}
