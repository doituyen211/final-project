package org.green.hr.repository;

import org.green.hr.entity.RewardDiscipline;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RewardDisciplineRepository extends JpaRepository<RewardDiscipline, Long> {

    @Query("SELECT rd FROM RewardDiscipline rd " +
            "JOIN rd.employee e " +
            "WHERE LOWER(rd.rdCode) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "AND LOWER(rd.category) LIKE LOWER(CONCAT('%', :contractCategory, '%')) " +
            "AND rd.money BETWEEN :minSalary AND :maxSalary " +
            "AND LOWER(e.employeeCode) LIKE LOWER(CONCAT('%', :employeeCode, '%'))")
    Page<RewardDiscipline> findByCriteria(@Param("searchTerm") String searchTerm,
                                          @Param("contractCategory") String contractCategory,
                                          @Param("minSalary") Double minSalary,
                                          @Param("maxSalary") Double maxSalary,
                                          @Param("employeeCode") String employeeCode,
                                          Pageable pageable);
}
