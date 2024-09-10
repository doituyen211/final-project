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
    public CoreResponse<?> getClassList(
            @RequestParam int page,
            @RequestParam int limit) {
        return iClassService.getClassList(page, limit);
    }

    @GetMapping("/classMember/{classId}")
    public CoreResponse<?> getStudentByClassId(
            @PathVariable int classId,
            @RequestParam int page,
            @RequestParam int limit) {
        return iClassService.getStudentByClassId(classId, page, limit);
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
            @RequestParam String className,
            @RequestParam int page,
            @RequestParam int limit) {
        return iClassService.findByClassNameContainingIgnoreCase(className, page, limit);
    }

    @GetMapping("/searchByDate")
    public CoreResponse<?> findByStartDateAndEndDate(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate,
            @RequestParam int page,
            @RequestParam int limit) {
        return iClassService.findByStartDateAndEndDate(startDate, endDate, page, limit);
    }


}
