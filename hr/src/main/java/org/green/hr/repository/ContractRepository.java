package org.green.hr.repository;

import org.green.hr.entity.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    @Query("SELECT c FROM Contract c " +
            "JOIN c.employee e " +
            "WHERE LOWER(c.contractCode) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "AND LOWER(c.contractCategory) LIKE LOWER(CONCAT('%', :contractCategory, '%')) " +
            "AND c.salary BETWEEN :minSalary AND :maxSalary " +
            "AND LOWER(e.employeeCode) LIKE LOWER(CONCAT('%', :employeeCode, '%'))")
    Page<Contract> findByCriteria(@Param("searchTerm") String searchTerm,
                                  @Param("contractCategory") String contractCategory,
                                  @Param("minSalary") Double minSalary,
                                  @Param("maxSalary") Double maxSalary,
                                  @Param("employeeCode") String employeeCode,
                                  Pageable pageable);

}
