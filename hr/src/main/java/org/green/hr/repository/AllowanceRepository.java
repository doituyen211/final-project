package org.green.hr.repository;

import org.green.hr.entity.Allowance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AllowanceRepository extends JpaRepository<Allowance, Long> {

    @Query("SELECT aw FROM Allowance aw WHERE "
            + "(:status IS NULL OR aw.status = :status) AND "
            + "(:keyword IS NULL OR LOWER(aw.allowanceCategory) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Allowance> findByStatusAndKeyword(
            @Param("status") Short status,
            @Param("keyword") String keyword,
            Pageable pageable);
}
