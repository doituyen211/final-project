package org.green.education.controller;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.Grade;
import org.green.education.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/score")
@CrossOrigin(origins = "http://localhost:3000")
public class GradeController {

    @Autowired
    private GradeService impGradeService;

    @GetMapping
    public ResponseEntity<List<GradeDTO>> getStudentGrade() {
        List<Grade> grades = impGradeService.getAllGrade();
        List<GradeDTO> gradeDTOs = grades.stream().map(GradeDTO::new).collect(Collectors.toList());
        return new ResponseEntity<>(gradeDTOs, HttpStatus.OK);
    }

    @PostMapping("/add-score")
    public ResponseEntity<GradeDTO> addGrade(@RequestBody Grade grade) {
        try {
//            Grade createdGrade = impGradeService.addGrade(grade);
            GradeDTO createdGradeDTO = impGradeService.addGrade(grade);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Custom-Header", "CreatedProduct");
            return new ResponseEntity<>(createdGradeDTO, headers, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update-score/{id}")
    public ResponseEntity<GradeDTO> updateGrade(@PathVariable int id, @RequestBody Grade grade) {
        try {
//            Grade updatedGrade = impGradeService.updateGrade(id, grade);
            GradeDTO updatedGradeDTO = impGradeService.updateGrade(id, grade);
            return new ResponseEntity<>(updatedGradeDTO, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete-score/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable int id) {
        GradeDTO existingGradeDTO = impGradeService.getGradeById(id);
        if (existingGradeDTO != null) {
            impGradeService.deleteGrade(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
