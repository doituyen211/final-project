package org.green.education.service;

import jakarta.transaction.Transactional;
import org.green.education.dto.LeaveOfAbsenceDTO;
import org.green.education.entity.LeaveOfAbsence;
import org.green.education.entity.Student;
import org.green.education.entity.Subject;
import org.green.education.repository.ILeaveOfAbsenceRepository;
import org.green.education.repository.IStudentRepository;
import org.green.education.repository.ISubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class LeaveOfAbsenceService implements ILeaveOfAbsenceService {


    private final ILeaveOfAbsenceRepository iLeaveOfAbsenceRepository;
    private final IStudentRepository studentRepository;
    private final ISubjectRepository subjectRepository;

    @Autowired
    public LeaveOfAbsenceService(ILeaveOfAbsenceRepository iLeaveOfAbsenceRepository,
                                 IStudentRepository studentRepository,
                                 ISubjectRepository subjectRepository) {
        this.iLeaveOfAbsenceRepository = iLeaveOfAbsenceRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public LeaveOfAbsence findByStudentId(int studentId) {
        return iLeaveOfAbsenceRepository.findByStudent_Id(studentId)
                .orElseThrow(() -> new RuntimeException("LeaveOfAbsence not found for studentId: " + studentId));
    }

    @Override
    public List<LeaveOfAbsence> getAllLeaveOfAbsence() {
        return iLeaveOfAbsenceRepository.findAll();
    }

    @Override
    public Optional<LeaveOfAbsence> findById(int id) {
        return iLeaveOfAbsenceRepository.findById(id);
    }


    @Override
    @Transactional
    public LeaveOfAbsence save(LeaveOfAbsence leaveOfAbsence) {
        return iLeaveOfAbsenceRepository.save(leaveOfAbsence);
    }


    @Override
    @Transactional
    public void deleteById(int id) {
        iLeaveOfAbsenceRepository.deleteById(id);
    }

    @Override
    @Transactional
    public LeaveOfAbsence updateLeaveOfAbsence(int id, LeaveOfAbsence leaveOfAbsence) {

        LeaveOfAbsence tempReserve = iLeaveOfAbsenceRepository.findById(id).orElseThrow(()-> new RuntimeException("Reserved not found"));

        if (leaveOfAbsence.getStudent() != null) {
            if (!iLeaveOfAbsenceRepository.existsById(leaveOfAbsence.getStudent().getId())) {
                throw new RuntimeException("Referenced Student does not exist");
            }
        }
        if (leaveOfAbsence.getSubject() != null) {
            if (!iLeaveOfAbsenceRepository.existsById(leaveOfAbsence.getSubject().getSubjectId())) {
                throw new RuntimeException("Referenced Subject does not exist");
            }
        }

        tempReserve.setStudent(leaveOfAbsence.getStudent());
        tempReserve.setStartDate(leaveOfAbsence.getStartDate());
        tempReserve.setEndDate(leaveOfAbsence.getEndDate());
        tempReserve.setSubject(leaveOfAbsence.getSubject());
        tempReserve.setStatus(leaveOfAbsence.getStatus());

        return iLeaveOfAbsenceRepository.save(tempReserve);
    }
}
