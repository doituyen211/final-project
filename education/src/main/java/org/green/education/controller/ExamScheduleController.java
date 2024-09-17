package org.green.education.controller;

import org.green.core.model.CoreResponse;
import org.green.education.dto.ExamScheduleDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.service.IExamScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/examschedules")
@CrossOrigin(origins = "http://localhost:3000")
public class ExamScheduleController {
    private final IExamScheduleService examScheduleService;

    @Autowired
    public ExamScheduleController(IExamScheduleService examScheduleService){
        this.examScheduleService = examScheduleService;
    }

    @GetMapping("")
    public ResponseEntity<CoreResponse<List<ExamScheduleDTO>>> getAllExamSchedule(){
        List<ExamScheduleDTO> examSchedules = examScheduleService.getExamSchedule();
        if (examSchedules == null) {
            CoreResponse<List<ExamScheduleDTO>> response = CoreResponse.<List<ExamScheduleDTO>>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Exam schedule null")
                    .data(null)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        CoreResponse<List<ExamScheduleDTO>> response = CoreResponse.<List<ExamScheduleDTO>>builder()
                .code(HttpStatus.OK.value())
                .message("Fetched all exam schedules successfully")
                .data(examSchedules)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/showdetail/{id}")
    public ResponseEntity<CoreResponse<ExamScheduleDTO>> getExamScheduleById(@PathVariable("id") Integer id){
        ExamScheduleDTO examScheduleDTO = examScheduleService.findExamScheduleById(id);
        if (examScheduleDTO == null) {
            CoreResponse<ExamScheduleDTO> response = CoreResponse.<ExamScheduleDTO>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Exam schedule not found")
                    .data(null)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        CoreResponse<ExamScheduleDTO> response = CoreResponse.<ExamScheduleDTO>builder()
                .code(HttpStatus.OK.value())
                .message("Fetched exam schedules successfullly")
                .data(examScheduleDTO)
                .build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/createExamSchedule")
    public ResponseEntity<CoreResponse<ExamScheduleDTO>> createExamSchedule(@RequestBody ExamScheduleDTO examScheduleDTO){
        ExamScheduleDTO createdExamSchedule = examScheduleService.addExamSchedule(examScheduleDTO);
        CoreResponse<ExamScheduleDTO> response = CoreResponse.<ExamScheduleDTO>builder()
                .code(HttpStatus.OK.value())
                .message("Created exam schedules successfully")
                .data(createdExamSchedule)
                .build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PutMapping("/updateExamSchedule/{id}")
    public ResponseEntity<CoreResponse<ExamScheduleDTO>> updateExamSchedule(@PathVariable Integer id, @RequestBody ExamScheduleDTO examScheduleDTO){
        examScheduleDTO.setId(id);
        try {
            ExamScheduleDTO updatedExamSchedule = examScheduleService.updateExamSchedule(examScheduleDTO);
            CoreResponse<ExamScheduleDTO> response = CoreResponse.<ExamScheduleDTO>builder()
                    .code(HttpStatus.OK.value())
                    .message("Exam schedule updated successfully")
                    .data(updatedExamSchedule)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e){
            CoreResponse<ExamScheduleDTO> response = CoreResponse.<ExamScheduleDTO>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Exam schedule not found")
                    .data(null)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/deleteExamSchedule/{id}")
    public ResponseEntity<CoreResponse<ExamScheduleDTO>> deleteExamSchedule(@PathVariable Integer id,@RequestBody ExamScheduleDTO examScheduleDTO){
        examScheduleDTO.setId(id);
        try {
            ExamScheduleDTO deletedExamSchedule = examScheduleService.deleteExamSchedule(examScheduleDTO);
            CoreResponse<ExamScheduleDTO> response = CoreResponse.<ExamScheduleDTO>builder()
                    .code(HttpStatus.OK.value())
                    .message("Exam schedule deleted successfully")
                    .data(deletedExamSchedule)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e){
            CoreResponse<ExamScheduleDTO> response = CoreResponse.<ExamScheduleDTO>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Exam schedule not found")
                    .data(null)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/subjects/{classId}")
    public ResponseEntity<CoreResponse<List<SubjectDto>>> getSubjectsByClassId(@PathVariable("classId") Integer classId) {
        try {
            List<SubjectDto> subjects = examScheduleService.getSubjectsByClassId(classId);
            CoreResponse<List<SubjectDto>> response = CoreResponse.<List<SubjectDto>>builder()
                    .code(HttpStatus.OK.value())
                    .message("Success")
                    .data(subjects)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            CoreResponse<List<SubjectDto>> response = CoreResponse.<List<SubjectDto>>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message(e.getMessage())
                    .data(null)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}
