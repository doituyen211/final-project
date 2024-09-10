package org.green.education.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.green.core.model.CoreResponse;
import org.green.education.entity.TrainingProgram;
import org.green.education.form.TrainingProgramForm;
import org.green.education.service.ITrainingProgramService;
import org.green.education.validation.ValidationErrorHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/training_program")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("")
    public CoreResponse<?> addProgram(@Valid @RequestBody TrainingProgramForm trainingProgramForm,BindingResult result) {
        CoreResponse<?> response = ValidationErrorHandler.handleValidationErrors(result);
        if (response != null) {
            return response;
        }
        return trainingProgramService.addTrainingProgram(trainingProgramForm);
    }

    @PutMapping("/{id}")
    public CoreResponse<?> updateProgram(@PathVariable int id,@Valid @RequestBody TrainingProgramForm trainingProgramForm,BindingResult result) {
        CoreResponse<?> response = ValidationErrorHandler.handleValidationErrors(result);
        if (response != null) {
            return response;
        }
        return trainingProgramService.updateTrainingProgram(id,trainingProgramForm);
    }


}

