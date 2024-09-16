package org.green.education.repository;

import org.green.education.entity.LeaveOfAbsence;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ILeaveOfAbsenceRepository extends JpaRepository<LeaveOfAbsence,Integer >, JpaSpecificationExecutor<LeaveOfAbsence> {

    // Add a method to find LeaveOfAbsence by studentId
    Optional<LeaveOfAbsence> findByStudent_Id(int studentId);

    Page<LeaveOfAbsence> findAll(Pageable pageable);

}
