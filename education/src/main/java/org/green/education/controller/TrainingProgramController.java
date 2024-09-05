package org.green.education.controller;

import lombok.RequiredArgsConstructor;
import org.green.education.service.ITrainingProgramService;
import org.green.education.service.TrainingProgramService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/training_program")
@RequiredArgsConstructor
public class TrainingProgramController {
    private final ITrainingProgramService trainingProgramService;

    @GetMapping("")
    public ResponseEntity<?> getAllTrainingPrograms() {
        return ResponseEntity.ok(trainingProgramService.getAllTrainingPrograms());
    }
}
