package org.green.education.controller;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.Grade;
import org.green.education.entity.*;

import org.green.education.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/score")
@CrossOrigin(origins = "http://localhost:3000")
public class GradeController {

    @Autowired
    private GradeService impGradeService;

    @GetMapping
    public ResponseEntity<?> getAllStudentGrades() {
        return new ResponseEntity<>(impGradeService.getAllGrade(), HttpStatus.OK);
    }

    @PostMapping("/add-score")
    public ResponseEntity<Grade> addGrade(@RequestBody Grade grade) {
        Grade createdGrade = impGradeService.addGrade(grade);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Custom-Header", "CreatedProduct");
        return new ResponseEntity<>(createdGrade, headers, HttpStatus.CREATED);

    }

    @PutMapping("/update-score/{id}")
    public ResponseEntity<Grade> updateGrade(@PathVariable int id, @RequestBody GradeDTO gradeDTO) {
        GradeDTO existingGrade = impGradeService.getGradeById(id);
        if (existingGrade.isPresent()) {
            Grade updatedNewGrade = impGradeService.updateGrade(id, gradeDTO);
            return new ResponseEntity<>(updatedNewGrade, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("delete-score/{id}")
    public ResponseEntity<Grade> deleteGrade(@PathVariable int id) {
        GradeDTO existingGrade = impGradeService.getGradeById(id);
        if (existingGrade.isPresent()) {
            impGradeService.deleteGrade(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
