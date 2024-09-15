package org.green.education.controller;

import org.green.education.dto.ExamScheduleDTO;
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
    public ResponseEntity<List<ExamScheduleDTO>> getAllExamSchedule(){
        List<ExamScheduleDTO> examSchedules = examScheduleService.getExamSchedule();
        return new ResponseEntity<>(examSchedules, HttpStatus.OK);
    }

    @PostMapping("/createExamSchedule")
    public ResponseEntity<ExamScheduleDTO> createExamSchedule(@RequestBody ExamScheduleDTO examScheduleDTO){
        ExamScheduleDTO createdExamSchedule = examScheduleService.addExamSchedule(examScheduleDTO);
        return new ResponseEntity<>(createdExamSchedule,HttpStatus.CREATED);
    }

    @PutMapping("/updateExamSchedule/{id}")
    public ResponseEntity<ExamScheduleDTO> updateExamSchedule(@PathVariable Integer id, @RequestBody ExamScheduleDTO examScheduleDTO){
        examScheduleDTO.setId(id);
        try {
            ExamScheduleDTO updatedExamSchedule = examScheduleService.updateExamSchedule(examScheduleDTO);
            return new ResponseEntity<>(updatedExamSchedule,HttpStatus.OK);
        } catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/deleteExamSchedule/{id}")
    public ResponseEntity<ExamScheduleDTO> deleteExamSchedule(@PathVariable Integer id,@RequestBody ExamScheduleDTO examScheduleDTO){
        examScheduleDTO.setId(id);
        try {
            ExamScheduleDTO deletedExamSchedule = examScheduleService.deleteExamSchedule(examScheduleDTO);
            return new ResponseEntity<>(deletedExamSchedule,HttpStatus.OK);
        } catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
