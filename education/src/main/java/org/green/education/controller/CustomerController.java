package org.green.education.controller;

import org.green.education.form.SubjectFilterForm;
import org.green.education.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    @Autowired
    private ICustomerService service ;
    @GetMapping()
    public ResponseEntity<?> getData(
            SubjectFilterForm form , @RequestParam(value = "page" , defaultValue = "1", required = false) int page ,
            @RequestParam(value ="pageSize", defaultValue = "10", required = false) int pageSize ,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
            @RequestParam(value = "sortBy", defaultValue = "subjectId", required = false) String sortBy
    ) {
        return service.findALL(form,page,pageSize, sortDir, sortBy) ;
    }
}
