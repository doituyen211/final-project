package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.entity.LeaveOfAbsence;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ILeaveOfAbsenceService {
    CoreResponse<LeaveOfAbsence> findById(int id);
    CoreResponse<LeaveOfAbsence> save(LeaveOfAbsence leaveOfAbsence);
    CoreResponse<Void> deleteById(int id);
    CoreResponse<LeaveOfAbsence> updateLeaveOfAbsence(int id, LeaveOfAbsence leaveOfAbsence);
    CoreResponse<LeaveOfAbsence> findByStudentId(int studentId);
    CoreResponse<Page<LeaveOfAbsence>> getAllLeaveOfAbsence(Pageable pageable);
}
