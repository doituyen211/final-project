package org.green.hr.controller;

import org.green.core.model.response.CoreResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hr/timesheets")
public class TimeSheetController {

    @GetMapping
    public ResponseEntity<CoreResponse> getAllTimesheets(@RequestParam(name = "pageNo", required = false, defaultValue = "1") int pageNo,
                                                         @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize,
                                                         @RequestParam(name = "status", required = false) Short status,
                                                         @RequestParam(name = "keyword") String keyword) {
        return null;
    }
}
