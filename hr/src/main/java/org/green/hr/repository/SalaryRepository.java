package org.green.hr.repository;

import org.green.hr.entity.Salary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {
    @Query("SELECT s FROM Salary s " +
            "JOIN s.employee e " +
            "WHERE (:minSalary IS NULL OR s.salary >= :minSalary) " +
            "AND (:maxSalary IS NULL OR s.salary <= :maxSalary) " +
            "AND LOWER(e.employeeCode) LIKE LOWER(CONCAT('%', :employeeCode, '%'))")
    Page<Salary> findByCriteria(@Param("minSalary") Double minSalary,
                                @Param("maxSalary") Double maxSalary,
                                @Param("employeeCode") String employeeCode,
                                Pageable pageable);
}
