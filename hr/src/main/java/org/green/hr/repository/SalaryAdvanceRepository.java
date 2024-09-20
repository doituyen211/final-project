package org.green.hr.repository;

import lombok.NonNull;
import org.green.hr.entity.SalaryAdvance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalaryAdvanceRepository extends JpaRepository<SalaryAdvance, Long> {
  @NonNull
  Page<SalaryAdvance> findAll(@NonNull Pageable pageable);
}
