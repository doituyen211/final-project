package org.green.education.service;

import org.green.education.entity.LeaveOfAbsence;
import org.springframework.stereotype.Service;

@Service
public interface ILeaveOfAbsenceService {

    LeaveOfAbsence findReserveByStudentId(int studentId);

    LeaveOfAbsence save(LeaveOfAbsence leaveOfAbsence);

    void  deleteById (int studentId);

    LeaveOfAbsence updateReserved(int id, LeaveOfAbsence leaveOfAbsence);

}
