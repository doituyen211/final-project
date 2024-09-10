package org.green.education.controller;

import org.green.core.model.CoreResponse;
import org.green.education.dto.LeaveOfAbsenceDTO;
import org.green.education.entity.LeaveOfAbsence;
import org.green.education.entity.Student;
import org.green.education.entity.Subject;
import org.green.education.repository.IStudentRepository;
import org.green.education.repository.ISubjectRepository;
import org.green.education.service.ILeaveOfAbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-of-absence")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaveOfAbsenceController {

    private final ILeaveOfAbsenceService leaveOfAbsenceService;
    private final IStudentRepository studentRepository;
    private final ISubjectRepository subjectRepository;

    @Autowired
    public LeaveOfAbsenceController(ILeaveOfAbsenceService leaveOfAbsenceService,
                                    IStudentRepository studentRepository,
                                    ISubjectRepository subjectRepository) {
        this.leaveOfAbsenceService = leaveOfAbsenceService;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoreResponse<LeaveOfAbsenceDTO>> getLeaveOfAbsenceById(@PathVariable int id) {
        CoreResponse<LeaveOfAbsence> response = leaveOfAbsenceService.findById(id);
        return ResponseEntity.status(response.getCode()).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                .data(new LeaveOfAbsenceDTO(response.getData()))
                .code(response.getCode())
                .message(response.getMessage())
                .build());
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<CoreResponse<LeaveOfAbsenceDTO>> getLeaveOfAbsenceByStudentId(@PathVariable int id) {
        CoreResponse<LeaveOfAbsence> response = leaveOfAbsenceService.findByStudentId(id);
        return ResponseEntity.status(response.getCode()).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                .data(new LeaveOfAbsenceDTO(response.getData()))
                .code(response.getCode())
                .message(response.getMessage())
                .build());
    }

    @PostMapping
    public ResponseEntity<CoreResponse<LeaveOfAbsenceDTO>> createLeaveOfAbsence(@RequestBody LeaveOfAbsenceDTO leaveOfAbsenceDTO) {
        LeaveOfAbsence leaveOfAbsence = new LeaveOfAbsence();

        // Map student
        Student student = studentRepository.findById(leaveOfAbsenceDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        leaveOfAbsence.setStudent(student);

        // Map subject
        Subject subject = subjectRepository.findById(leaveOfAbsenceDTO.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        leaveOfAbsence.setSubject(subject);

        // Set other fields
        leaveOfAbsence.setStartDate(leaveOfAbsenceDTO.getStartTime());
        leaveOfAbsence.setEndDate(leaveOfAbsenceDTO.getEndTime());
        leaveOfAbsence.setStatus(leaveOfAbsenceDTO.getStatus());

        CoreResponse<LeaveOfAbsence> response = leaveOfAbsenceService.save(leaveOfAbsence);
        return ResponseEntity.status(response.getCode()).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                .data(new LeaveOfAbsenceDTO(response.getData()))
                .code(response.getCode())
                .message(response.getMessage())
                .build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<CoreResponse<LeaveOfAbsenceDTO>> updateLeaveOfAbsence(@PathVariable int id, @RequestBody LeaveOfAbsenceDTO leaveOfAbsenceDTO) {
        CoreResponse<LeaveOfAbsence> existingResponse = leaveOfAbsenceService.findById(id);

        if (existingResponse.getData() == null) {
            return ResponseEntity.status(404).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                    .code(404)
                    .message("Leave of Absence not found")
                    .build());
        }

        LeaveOfAbsence leaveOfAbsence = existingResponse.getData();

        // Update student
        Student student = studentRepository.findById(leaveOfAbsenceDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        leaveOfAbsence.setStudent(student);

        // Update subject
        Subject subject = subjectRepository.findById(leaveOfAbsenceDTO.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        leaveOfAbsence.setSubject(subject);

        // Update other fields
        leaveOfAbsence.setStartDate(leaveOfAbsenceDTO.getStartTime());
        leaveOfAbsence.setEndDate(leaveOfAbsenceDTO.getEndTime());
        leaveOfAbsence.setStatus(leaveOfAbsenceDTO.getStatus());

        CoreResponse<LeaveOfAbsence> response = leaveOfAbsenceService.updateLeaveOfAbsence(id, leaveOfAbsence);
        return ResponseEntity.status(response.getCode()).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                .data(new LeaveOfAbsenceDTO(response.getData()))
                .code(response.getCode())
                .message(response.getMessage())
                .build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<CoreResponse<Void>> deleteLeaveOfAbsenceById(@PathVariable int id) {
        CoreResponse<Void> response = leaveOfAbsenceService.deleteById(id);
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping
    public ResponseEntity<CoreResponse<Page<LeaveOfAbsenceDTO>>> getAllLeaveOfAbsences(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        CoreResponse<Page<LeaveOfAbsence>> response = leaveOfAbsenceService.getAllLeaveOfAbsence(pageable);
        Page<LeaveOfAbsenceDTO> dtoPage = response.getData().map(LeaveOfAbsenceDTO::new);

        return ResponseEntity.status(response.getCode()).body(CoreResponse.<Page<LeaveOfAbsenceDTO>>builder()
                .data(dtoPage)
                .code(response.getCode())
                .message(response.getMessage())
                .build());
    }
}
