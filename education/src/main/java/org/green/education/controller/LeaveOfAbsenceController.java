package org.green.education.controller;

import org.green.core.model.CoreResponse;
import org.green.education.dto.LeaveOfAbsenceDTO;
import org.green.education.entity.LeaveOfAbsence;
import org.green.education.entity.Student;
import org.green.education.entity.Subject;
import org.green.education.repository.IStudentRepository;
import org.green.education.repository.ISubjectRepository;
import org.green.education.service.GradeService;
import org.green.education.service.ILeaveOfAbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leave-of-absence")
public class LeaveOfAbsenceController {

    private final ILeaveOfAbsenceService leaveOfAbsenceService;
    private final IStudentRepository studentRepository;
    private final ISubjectRepository subjectRepository;
    private final GradeService gradeService;

    @Autowired
    public LeaveOfAbsenceController(ILeaveOfAbsenceService leaveOfAbsenceService,
                                    IStudentRepository studentRepository,
                                    ISubjectRepository subjectRepository, GradeService gradeService) {
        this.leaveOfAbsenceService = leaveOfAbsenceService;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
        this.gradeService = gradeService;
    }

    // Endpoint to get LeaveOfAbsence by ID
    @GetMapping("/{id}")
    public ResponseEntity<LeaveOfAbsenceDTO> getLeaveOfAbsenceById(@PathVariable int id) {
        try {
            LeaveOfAbsence leaveOfAbsence = leaveOfAbsenceService.findById(id)
                    .orElseThrow(() -> new RuntimeException("LeaveOfAbsence not found with id " + id));
            LeaveOfAbsenceDTO leaveOfAbsenceDTO = new LeaveOfAbsenceDTO(leaveOfAbsence);
            return new ResponseEntity<>(leaveOfAbsenceDTO, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<LeaveOfAbsenceDTO> getLeaveOfAbsenceByStudentId(@PathVariable int id) {
        try {
            LeaveOfAbsence leaveOfAbsence = leaveOfAbsenceService.findByStudentId(id);
            LeaveOfAbsenceDTO leaveOfAbsenceDTO = new LeaveOfAbsenceDTO(leaveOfAbsence);
            return new ResponseEntity<>(leaveOfAbsenceDTO, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to create a new LeaveOfAbsence
    @PostMapping
    public ResponseEntity<LeaveOfAbsenceDTO> createLeaveOfAbsence(@RequestBody LeaveOfAbsenceDTO leaveOfAbsenceDTO) {
        try {
            // Convert DTO to entity
            LeaveOfAbsence leaveOfAbsence = new LeaveOfAbsence();
            leaveOfAbsence.setStudent(studentRepository.findById(leaveOfAbsenceDTO.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Referenced Student does not exist")));
            leaveOfAbsence.setStartDate(leaveOfAbsenceDTO.getStartTime());
            leaveOfAbsence.setEndDate(leaveOfAbsenceDTO.getEndTime());
            leaveOfAbsence.setStatus(leaveOfAbsenceDTO.getStatus());
            leaveOfAbsence.setSubject(subjectRepository.findById(leaveOfAbsenceDTO.getSubjectId())
                    .orElseThrow(() -> new RuntimeException("Referenced Subject does not exist")));

            // Save entity
            LeaveOfAbsence savedLeaveOfAbsence = leaveOfAbsenceService.save(leaveOfAbsence);

            // Convert back to DTO
            LeaveOfAbsenceDTO savedLeaveOfAbsenceDTO = new LeaveOfAbsenceDTO(savedLeaveOfAbsence);

            return new ResponseEntity<>(savedLeaveOfAbsenceDTO, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<LeaveOfAbsenceDTO> updateLeaveOfAbsence(@PathVariable int id, @RequestBody LeaveOfAbsenceDTO leaveOfAbsenceDTO) {
        try {
            LeaveOfAbsence existingLeaveOfAbsence = leaveOfAbsenceService.findById(id)
                    .orElseThrow(() -> new RuntimeException("LeaveOfAbsence not found with id " + id));

            // Update fields
            existingLeaveOfAbsence.setStartDate(leaveOfAbsenceDTO.getStartTime());
            existingLeaveOfAbsence.setEndDate(leaveOfAbsenceDTO.getEndTime());
            existingLeaveOfAbsence.setStatus(leaveOfAbsenceDTO.getStatus());

            // Update associations if needed
            Student student = studentRepository.findById(leaveOfAbsenceDTO.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Referenced Student does not exist"));
            Subject subject = subjectRepository.findById(leaveOfAbsenceDTO.getSubjectId())
                    .orElseThrow(() -> new RuntimeException("Referenced Subject does not exist"));

            existingLeaveOfAbsence.setStudent(student);
            existingLeaveOfAbsence.setSubject(subject);

            LeaveOfAbsence updatedLeaveOfAbsence = leaveOfAbsenceService.save(existingLeaveOfAbsence);

            LeaveOfAbsenceDTO updatedLeaveOfAbsenceDTO = new LeaveOfAbsenceDTO(updatedLeaveOfAbsence);

            return new ResponseEntity<>(updatedLeaveOfAbsenceDTO, HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    // Endpoint to delete a LeaveOfAbsence by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteLeaveOfAbsenceById(@PathVariable int id) {
        try {
            leaveOfAbsenceService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<LeaveOfAbsenceDTO>> getAllLeaveOfAbsences() {
        List<LeaveOfAbsence> leaveOfAbsences = leaveOfAbsenceService.getAllLeaveOfAbsence();
        List<LeaveOfAbsenceDTO> leaveOfAbsenceDTOs = leaveOfAbsences.stream().map(LeaveOfAbsenceDTO::new).collect(Collectors.toList());
        return new ResponseEntity<>(leaveOfAbsenceDTOs, HttpStatus.OK);
    }


}
