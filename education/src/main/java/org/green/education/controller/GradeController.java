package org.green.education.controller;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.Grade;
import org.green.education.form.GradeForm;
import org.green.education.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/score")
public class GradeController {

    @Autowired
    private GradeService impGradeService;

    @GetMapping
    public ResponseEntity<List<GradeDTO>> getStudentGrade() {
        List<GradeDTO> grades = impGradeService.getStudentGrade();
        return new ResponseEntity<>(grades, HttpStatus.OK);
    }

    @PostMapping("/add-score")
    public ResponseEntity<GradeForm> addGrade(@RequestBody GradeForm gradeForm) {
        try {
            GradeForm createdGrade = impGradeService.addGrade(gradeForm);
            System.out.println(createdGrade);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Custom-Header", "CreatedProduct");
            return new ResponseEntity<>(createdGrade, headers, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update-score/{id}")
    public ResponseEntity<GradeForm> updateGrade(@PathVariable int id, @RequestBody GradeForm gradeForm) {
        try {
            GradeForm updatedGrade = impGradeService.updateGrade(id, gradeForm);
            return new ResponseEntity<>(updatedGrade, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete-score/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable int id) {
        Grade existingGradeDTO = impGradeService.getGradeById(id);
        if (existingGradeDTO != null) {
            impGradeService.deleteGrade(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
