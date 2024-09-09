package org.green.education.controller;

import org.green.education.form.ClassForm;
import org.green.education.service.IClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/class")
public class ClassController {
    @Autowired
    IClassService iClassService;

    @GetMapping("/{classId}")
    public ResponseEntity<?> getClassById(@PathVariable int classId) {
        return new ResponseEntity<>(iClassService.getClassById(classId), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getClassList() {
        return new ResponseEntity<>(iClassService.getClassList(), HttpStatus.OK);
    }

    @GetMapping("/classMember/{classId}")
    public ResponseEntity<?> getStudentByClassId(@PathVariable int classId) {
        return new ResponseEntity<>(iClassService.getStudentByClassId(classId), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createClass(@RequestBody ClassForm classForm) {
        return new ResponseEntity<>(iClassService.createClass(classForm), HttpStatus.OK);
    }

    @PutMapping("/{classId}")
    public ResponseEntity<?> editClass(@PathVariable int classId, @RequestBody ClassForm classForm) {
        return new ResponseEntity<>(iClassService.editClass(classId, classForm), HttpStatus.OK);
    }

}
