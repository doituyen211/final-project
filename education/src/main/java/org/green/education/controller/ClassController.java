package org.green.education.controller;

import org.green.core.model.CoreResponse;
import org.green.education.form.ClassForm;
import org.green.education.service.IClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/class")
public class ClassController {
    @Autowired
    IClassService iClassService;

    @GetMapping("/{classId}")
    public CoreResponse<?> getClassById(@PathVariable int classId) {
        return iClassService.getClassById(classId);
    }

    @GetMapping("")
    public CoreResponse<?> getClassList(@RequestParam int page, @RequestParam int limit) {
        return iClassService.getClassList(page, limit);
    }

    @GetMapping("/classMember/{classId}")
    public CoreResponse<?> getStudentByClassId(@PathVariable int classId, @RequestParam int page, @RequestParam int limit) {
        return iClassService.getStudentByClassId(classId, page, limit);
    }

    @PostMapping("")
    public CoreResponse<?> createClass(@RequestBody ClassForm classForm) {
        return iClassService.createClass(classForm);
    }

    @PutMapping("/{classId}")
    public CoreResponse<?> editClass(@PathVariable int classId, @RequestBody ClassForm classForm) {
        return iClassService.editClass(classId, classForm);
    }

}
