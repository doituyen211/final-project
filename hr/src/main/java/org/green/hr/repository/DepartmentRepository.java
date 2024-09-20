package org.green.hr.repository;

import java.util.Optional;
import org.green.hr.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

  Department findByDepartmentName(String departmentName);

  Optional<Department> findById(long id);

}
