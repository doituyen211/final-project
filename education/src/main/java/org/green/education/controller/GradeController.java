package org.green.education.controller;

import org.green.core.model.CoreResponse;
import org.green.education.form.GradeForm;
import org.green.education.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/scores")
public class GradeController {

    @Autowired
    private GradeService iGradeService;

    @GetMapping("/grade-by-examdate/{studentId}")
    public CoreResponse<?> getGradeByExamDate(@PathVariable Integer studentId) {
        return iGradeService.getGradeByExamDate(studentId);
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
