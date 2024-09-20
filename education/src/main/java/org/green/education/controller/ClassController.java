package org.green.education.controller;

import jakarta.validation.Valid;
import org.green.core.model.CoreResponse;
import org.green.education.form.ClassForm;
import org.green.education.service.IClassService;
import org.green.education.validation.ValidationErrorHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("api/v1/classes")
public class ClassController {
    @Autowired
    IClassService iClassService;

    @GetMapping
    public CoreResponse<?> getClassList(
            @RequestParam(required = false) String className,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {

        if (className != null) {
            return iClassService.findByClassNameContainingIgnoreCase(className);
        } else if (startDate != null && endDate != null) {
            return iClassService.findByStartDateAndEndDate(startDate, endDate);
        } else {
            return iClassService.getClassList();
        }
    }

    @GetMapping("/{classId}")
    public CoreResponse<?> getClassById(@PathVariable int classId) {
        return iClassService.getClassById(classId);
    }

    @GetMapping("/classMember/{classId}")
    public CoreResponse<?> getStudentByClassId(
            @PathVariable int classId) {
        return iClassService.getStudentByClassId(classId);
    }

    @PostMapping("")
    public CoreResponse<?> createClass(
            @Valid @RequestBody ClassForm classForm,
            BindingResult result) {
        CoreResponse<?> response = ValidationErrorHandler.handleValidationErrors(result);

        if (response == null) {
            return iClassService.createClass(classForm);
        }

        return response;
    }

    @PutMapping("/{classId}")
    public CoreResponse<?> editClass(
            @PathVariable int classId,
            @Valid @RequestBody ClassForm classForm,
            BindingResult result) {
        CoreResponse<?> response = ValidationErrorHandler.handleValidationErrors(result);

        if (response == null) {
            return iClassService.editClass(classId, classForm);
        }

        return response;
    }

    @DeleteMapping("/{classId}")
    public CoreResponse<?> deleteClass(@PathVariable int classId) {
        return iClassService.deleteClass(classId);
    }
}
