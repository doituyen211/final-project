package org.green.education.controller;

import org.green.education.dto.ClassMembersDto;
import org.green.education.form.ClassMembersFillterForm;
import org.green.education.service.IClassMembersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/cm")

public class ClassMembersController {

    @Autowired
    private IClassMembersService classMembersService ;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ClassMembersDto classMembersDto) {
        return classMembersService.create(classMembersDto);
    }

    @GetMapping()
    public ResponseEntity<?> getData(
            ClassMembersFillterForm form , @RequestParam(value = "page" , defaultValue = "1", required = false) int page ,
            @RequestParam(value ="pageSize", defaultValue = "10", required = false) int pageSize ,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
            @RequestParam(value = "sortBy", defaultValue = "Id", required = false) String sortBy
    ) {
        return classMembersService.findALL(form,page,pageSize, sortDir, sortBy) ;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Integer id) {
        return classMembersService.findById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateById(@PathVariable("id") Integer id, @RequestBody ClassMembersDto classMembersDto) {
        return classMembersService.updateById(id, classMembersDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Integer id) {

        return  classMembersService.deleteById(id);
    }

}
