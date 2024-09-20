package org.green.education.repository;

import org.green.education.dto.DashboardDTO;
import org.green.education.entity.LeaveOfAbsence;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ILeaveOfAbsenceRepository extends JpaRepository<LeaveOfAbsence, Integer>, JpaSpecificationExecutor<LeaveOfAbsence> {

    // Add a method to find LeaveOfAbsence by studentId
    Optional<LeaveOfAbsence> findByStudent_Id(int studentId);

    Page<LeaveOfAbsence> findAll(Pageable pageable);

    @Query("SELECT l.startDate FROM LeaveOfAbsence l WHERE l.status = 0")
    List<Date> getListWithMonth();


}
