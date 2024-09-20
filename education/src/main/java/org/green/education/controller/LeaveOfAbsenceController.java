package org.green.education.controller;

import jakarta.validation.Valid;
import org.green.core.model.CoreResponse;
import org.green.education.dto.LeaveOfAbsenceDTO;
import org.green.education.entity.LeaveOfAbsence;
import org.green.education.entity.Student;
import org.green.education.entity.Subject;
import org.green.education.form.LeaveOfAbsenceCreateForm;
import org.green.education.repository.IStudentRepository;
import org.green.education.repository.ISubjectRepository;
import org.green.education.service.ILeaveOfAbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<CoreResponse<LeaveOfAbsenceDTO>> createLeaveOfAbsence(
            @Valid @RequestBody LeaveOfAbsenceCreateForm leaveOfAbsenceCreateForm, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            // Handle validation errors
            StringBuilder errorMessage = new StringBuilder();
            bindingResult.getAllErrors().forEach(error -> errorMessage.append(error.getDefaultMessage()).append(" "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(errorMessage.toString().trim())
                    .build());
        }

        // Validate required fields
        if (leaveOfAbsenceCreateForm.getStudentId() == null || leaveOfAbsenceCreateForm.getSubjectId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Both Student Id and Subject Id are required")
                    .build());
        }

        // Map student
        Optional<Student> studentOpt = studentRepository.findById(leaveOfAbsenceCreateForm.getStudentId());
        if (!studentOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Student Id does not exist")
                    .build());
        }

        // Map subject
        Optional<Subject> subjectOpt = subjectRepository.findById(leaveOfAbsenceCreateForm.getSubjectId());
        if (!subjectOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Subject Id does not exist")
                    .build());
        }

        LeaveOfAbsence leaveOfAbsence = new LeaveOfAbsence();
        leaveOfAbsence.setStudent(studentOpt.get());
        leaveOfAbsence.setSubject(subjectOpt.get());
        leaveOfAbsence.setStartDate(leaveOfAbsenceCreateForm.getStartTime());
        leaveOfAbsence.setEndDate(leaveOfAbsenceCreateForm.getEndTime());

        // Calculate status based on startTime and endTime
        Date now = new Date();
        int status = (now.after(leaveOfAbsenceCreateForm.getStartTime()) && now.before(leaveOfAbsenceCreateForm.getEndTime())) ? 1 : 0;
        leaveOfAbsence.setStatus(status);

        CoreResponse<LeaveOfAbsence> response = leaveOfAbsenceService.save(leaveOfAbsence);
        return ResponseEntity.status(response.getCode()).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                .data(new LeaveOfAbsenceDTO(response.getData()))
                .code(response.getCode())
                .message(response.getMessage())
                .build());

    @PutMapping("/{id}")
    public ResponseEntity<CoreResponse<LeaveOfAbsenceDTO>> updateLeaveOfAbsence(@PathVariable int id, @Valid @RequestBody LeaveOfAbsenceCreateForm leaveOfAbsenceCreateForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Handle validation errors
            StringBuilder errorMessage = new StringBuilder();
            bindingResult.getAllErrors().forEach(error -> errorMessage.append(error.getDefaultMessage()).append(" "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(errorMessage.toString().trim())
                    .build());
        }

        CoreResponse<LeaveOfAbsence> existingResponse = leaveOfAbsenceService.findById(id);

        if (existingResponse.getData() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Leave of Absence not found")
                    .build());
        }

        LeaveOfAbsence leaveOfAbsence = existingResponse.getData();

        // Validate required fields
        if (leaveOfAbsenceCreateForm.getStudentId() == null || leaveOfAbsenceCreateForm.getSubjectId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Both Student Id and Subject Id are required")
                    .build());
        }

        // Update student
        Optional<Student> studentOpt = studentRepository.findById(leaveOfAbsenceCreateForm.getStudentId());
        if (!studentOpt.isPresent()) {-
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Student Id does not exist")
                    .build());
        }
        leaveOfAbsence.setStudent(studentOpt.get());

        // Update subject
        Optional<Subject> subjectOpt = subjectRepository.findById(leaveOfAbsenceCreateForm.getSubjectId());
        if (!subjectOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CoreResponse.<LeaveOfAbsenceDTO>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Subject Id does not exist")
                    .build());
        }
        leaveOfAbsence.setSubject(subjectOpt.get());


        // Update other fields
        leaveOfAbsence.setStartDate(leaveOfAbsenceCreateForm.getStartTime());
        leaveOfAbsence.setEndDate(leaveOfAbsenceCreateForm.getEndTime());

        // Calculate status based on startDate and endDate
        Date now = new Date();
        int status = (now.after(leaveOfAbsence.getStartDate()) && now.before(leaveOfAbsence.getEndDate())) ? 1 : 0;
        leaveOfAbsence.setStatus(status);

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
