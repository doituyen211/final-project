package org.green.hr.repository;

import org.green.hr.entity.Position;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {

	@Query("SELECT p FROM Position p WHERE "
            + "(:status IS NULL OR p.status = :status) AND "
            + "(:keyword IS NULL OR LOWER(p.positionName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Position> findByStatusAndKeyword(
            @Param("status") Short status,
            @Param("keyword") String keyword,
            Pageable pageable);

    Position findByPositionName(String positionName);
}
