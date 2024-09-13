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

    @GetMapping("/{classId}")
    public CoreResponse<?> getClassById(@PathVariable int classId) {
        return iClassService.getClassById(classId);
    }

    @GetMapping("")
    public CoreResponse<?> getClassList() {
        return iClassService.getClassList();
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

    @GetMapping("/searchByClassName")
    public CoreResponse<?> findByClassNameContainingIgnoreCase(
            @RequestParam String className) {
        return iClassService.findByClassNameContainingIgnoreCase(className);
    }

    @GetMapping("/searchByDate")
    public CoreResponse<?> findByStartDateAndEndDate(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        return iClassService.findByStartDateAndEndDate(startDate, endDate);
    }


}
