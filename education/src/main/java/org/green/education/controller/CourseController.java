package org.green.education.controller;

import org.green.education.dto.CourseDto;
import org.green.education.form.CourseFilterForm;
import org.green.education.service.ICourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api/v1/course")

public class CourseController {

    @Autowired
    private ICourseService courseService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CourseDto courseDto) {
        return courseService.create(courseDto);
    }

    @GetMapping()
    public ResponseEntity<?> getData(
            CourseFilterForm form , @RequestParam(value = "page" , defaultValue = "0", required = false) int page ,
            @RequestParam(value ="pageSize", defaultValue = "10", required = false) int pageSize ,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
            @RequestParam(value = "sortBy", defaultValue = "courseId", required = false) String sortBy
    ) {
        return courseService.findALL(form,page,pageSize, sortDir, sortBy) ;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Integer id) {
        return courseService.findById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateById(@PathVariable("id") Integer id, @RequestBody CourseDto courseDto) {
        return courseService.updateById(id, courseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Integer id) {

        return  courseService.deleteById(id);
    }

}
