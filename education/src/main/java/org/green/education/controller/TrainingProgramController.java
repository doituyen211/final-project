package org.green.education.controller;

import lombok.RequiredArgsConstructor;
import org.green.core.model.CoreResponse;
import org.green.education.dto.ProgramDTO;
import org.green.education.service.ITrainingProgramService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/training_program")
@RequiredArgsConstructor
public class TrainingProgramController {
    private final ITrainingProgramService trainingProgramService;

    @GetMapping("")
    public CoreResponse<?> getAllTrainingPrograms(@RequestParam(value = "page") int page, @RequestParam("limit") int limit) {
        return trainingProgramService.getAllTrainingPrograms(page, limit);
    }

    @GetMapping("/getListClassByProgramId/{id}")
    public ResponseEntity<?> getListClassByProgramId(@PathVariable int id, @RequestParam(value = "page") int page, @RequestParam("limit") int limit) {
        return ResponseEntity.ok(trainingProgramService.getClassesByTrainingProgramId(id, page, limit));
    }

    @GetMapping("/getListSubjectByProgramId/{id}")
    public ResponseEntity<?> getListSubjectByProgramId(@PathVariable int id, @RequestParam(value = "page") int page, @RequestParam("limit") int limit) {
        return ResponseEntity.ok(trainingProgramService.getSubjectsByTrainingProgramId(id, page, limit));
    }
}
