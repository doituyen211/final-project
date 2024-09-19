package org.green.education.controller;

import org.green.core.model.CoreResponse;
import org.green.education.dto.ProgramDTO;
import org.green.education.dto.StudentDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.form.GradeForm;
import org.green.education.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/scores")
public class GradeController {

    @Autowired
    private GradeService iGradeService;

    @GetMapping("/get-all-grade-by-exam-date")
    public CoreResponse<?> getAllGradeByExamDate() {
        return iGradeService.getAllGradeByExamDate();
    }

    @GetMapping("/subject-for-grade")
    public CoreResponse<?> getSubjectNameGrade() {
        return iGradeService.getAllSubjectGrade();
    }

    @GetMapping("/training-program-for-grade")
    public CoreResponse<?> getTrainingNameGrade() {
        return iGradeService.getAllTrainingGrade();
    }

    @GetMapping("/student-for-grade")
    public CoreResponse<?> getStudentNameGrade() {
        return iGradeService.getAllStudentGrade();
    }

    @GetMapping
    public CoreResponse<?> getAllGrade() {
        return iGradeService.getAllGrade();
    }

    @PostMapping("/add-score")
    public CoreResponse<?> addGrade(@RequestBody GradeForm gradeForm) {
        return iGradeService.addingGrade(gradeForm);
    }

    @PutMapping("/update-score/{id}")
    public CoreResponse<?> updateGrade(@PathVariable int id, @RequestBody GradeForm gradeForm) {
            return iGradeService.updatingGrade(id, gradeForm);
    }

    @DeleteMapping("/delete-score/{id}")
    public CoreResponse<?> deleteGrade(@PathVariable int id) {
           return iGradeService.deletingGrade(id);
    }
}
