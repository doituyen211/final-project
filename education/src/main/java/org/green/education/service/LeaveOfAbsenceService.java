package org.green.education.service;

import jakarta.transaction.Transactional;
import org.green.core.model.CoreResponse;
import org.green.education.entity.LeaveOfAbsence;
import org.green.education.repository.ILeaveOfAbsenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveOfAbsenceService implements ILeaveOfAbsenceService {

    private final ILeaveOfAbsenceRepository iLeaveOfAbsenceRepository;

    @Autowired
    public LeaveOfAbsenceService(ILeaveOfAbsenceRepository iLeaveOfAbsenceRepository) {
        this.iLeaveOfAbsenceRepository = iLeaveOfAbsenceRepository;
    }

    @Override
    public CoreResponse<LeaveOfAbsence> findById(int id) {
        return iLeaveOfAbsenceRepository.findById(id)
                .map(leave -> CoreResponse.<LeaveOfAbsence>builder()
                        .data(leave)
                        .code(200)
                        .message("Leave of Absence found")
                        .build())
                .orElse(CoreResponse.<LeaveOfAbsence>builder()
                        .code(404)
                        .message("Leave of Absence not found")
                        .build());
    }

    @Override
    @Transactional
    public CoreResponse<LeaveOfAbsence> save(LeaveOfAbsence leaveOfAbsence) {
        LeaveOfAbsence saved = iLeaveOfAbsenceRepository.save(leaveOfAbsence);
        return CoreResponse.<LeaveOfAbsence>builder()
                .data(saved)
                .code(201)
                .message("Leave of Absence created successfully")
                .build();
    }

    @Override
    @Transactional
    public CoreResponse<Void> deleteById(int id) {
        iLeaveOfAbsenceRepository.deleteById(id);
        return CoreResponse.<Void>builder()
                .code(204)
                .message("Leave of Absence deleted successfully")
                .build();
    }

    @Override
    @Transactional
    public CoreResponse<LeaveOfAbsence> updateLeaveOfAbsence(int id, LeaveOfAbsence leaveOfAbsence) {
        LeaveOfAbsence existing = iLeaveOfAbsenceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave of Absence not found"));

        existing.setStartDate(leaveOfAbsence.getStartDate());
        existing.setEndDate(leaveOfAbsence.getEndDate());
        existing.setStudent(leaveOfAbsence.getStudent());
        existing.setSubject(leaveOfAbsence.getSubject());
        existing.setStatus(leaveOfAbsence.getStatus());

        LeaveOfAbsence updated = iLeaveOfAbsenceRepository.save(existing);
        return CoreResponse.<LeaveOfAbsence>builder()
                .data(updated)
                .code(200)
                .message("Leave of Absence updated successfully")
                .build();
    }

    @Override
    public CoreResponse<LeaveOfAbsence> findByStudentId(int studentId) {
        return iLeaveOfAbsenceRepository.findByStudent_Id(studentId)
                .map(leave -> CoreResponse.<LeaveOfAbsence>builder()
                        .data(leave)
                        .code(200)
                        .message("Leave of Absence found for studentId")
                        .build())
                .orElse(CoreResponse.<LeaveOfAbsence>builder()
                        .code(404)
                        .message("Leave of Absence not found for studentId")
                        .build());
    }

    @Override
    public CoreResponse<Page<LeaveOfAbsence>> getAllLeaveOfAbsence(Pageable pageable) {
        Page<LeaveOfAbsence> leaveOfAbsencesPage = iLeaveOfAbsenceRepository.findAll(pageable);
        return CoreResponse.<Page<LeaveOfAbsence>>builder()
                .data(leaveOfAbsencesPage)
                .code(200)
                .message("Success")
                .build();
    }
}
