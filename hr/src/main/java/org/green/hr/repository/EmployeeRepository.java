package org.green.hr.repository;

import jakarta.validation.constraints.NotNull;
import org.green.hr.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT e FROM Employee e WHERE e.employeeCode = :employeeCode")
    @NotNull
    Employee findEmployeeByCode(@Param("employeeCode") String employeeCode);

    @Query("SELECT e FROM Employee e WHERE e.employeeName = :employeeName")
    Employee findByEmployeeName(String employeeName);
}
