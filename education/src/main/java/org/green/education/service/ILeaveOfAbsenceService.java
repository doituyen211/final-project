package org.green.education.service;

import org.green.education.dto.LeaveOfAbsenceDTO;
import org.green.education.entity.LeaveOfAbsence;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ILeaveOfAbsenceService {

    Optional<LeaveOfAbsence> findById(int id);

    LeaveOfAbsence save(LeaveOfAbsence leaveOfAbsence);

    void  deleteById (int id);

    LeaveOfAbsence updateLeaveOfAbsence(int id, LeaveOfAbsence leaveOfAbsence);

    LeaveOfAbsence findByStudentId(int studentId);

    List<LeaveOfAbsence> getAllLeaveOfAbsence();
}
