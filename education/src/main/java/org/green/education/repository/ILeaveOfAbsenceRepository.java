package org.green.education.repository;

import org.green.education.entity.LeaveOfAbsence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ILeaveOfAbsenceRepository extends JpaRepository<LeaveOfAbsence,Integer >, JpaSpecificationExecutor<LeaveOfAbsence> {
}
