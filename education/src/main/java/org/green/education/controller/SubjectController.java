package org.green.education.controller;

import org.green.core.model.CoreResponse;
import org.green.education.dto.SubjectDto;
import org.green.education.form.SubjectFilterForm;
import org.green.education.service.ISubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/subjects")
public class SubjectController {
    @Autowired
    private ISubjectService subjectService ;

    @PostMapping
    public CoreResponse<?> create(@RequestBody SubjectDto subjectDto) {
        return subjectService.create(subjectDto);
    }

    @GetMapping()
    public CoreResponse<?> getData(
            SubjectFilterForm form , @RequestParam(value = "page" , defaultValue = "1", required = false) int page ,
            @RequestParam(value ="pageSize", defaultValue = "10", required = false) int pageSize ,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
            @RequestParam(value = "sortBy", defaultValue = "subjectId", required = false) String sortBy
    ) {
        return subjectService.findALL(form,page,pageSize, sortDir, sortBy) ;
    }

    @GetMapping("find-all")
    public CoreResponse<?> findAllNotPaging(
    ) {
        return subjectService.findAllNotPaging() ;
    }

    @GetMapping("/{id}")
    public CoreResponse<?> findById(@PathVariable("id") Integer id) {
        return subjectService.findById(id);
    }

    @PutMapping("/{id}")
    public CoreResponse<?> updateById(@PathVariable("id") Integer id, @RequestBody SubjectDto subjectDto) {
        return subjectService.updateById(id, subjectDto);
    }

    @DeleteMapping("/{id}")
    public CoreResponse<?> deleteById(@PathVariable("id") Integer id) {

        return  subjectService.deleteById(id);
    }

}
