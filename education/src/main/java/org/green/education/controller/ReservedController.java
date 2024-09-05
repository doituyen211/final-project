package org.green.education.controller;

import org.green.education.dto.ReservedDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Grade;
import org.green.education.entity.Reserved;
import org.green.education.service.IReserveService;
import org.green.education.service.ReserveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/reservation")
public class ReservedController {

    @Autowired
    private ReserveService reserveService;

    @GetMapping("/{id}")
    public ResponseEntity<Reserved> getReserveByStudentId(@PathVariable int id) {
        return new ResponseEntity<>(reserveService.findReserveByStudentId(id), HttpStatus.OK);
    }


    @DeleteMapping("delete-reserve/{id}")
    public ResponseEntity<Reserved> deleteGrade(@PathVariable int id) {
        Optional<Reserved> temp = Optional.ofNullable(reserveService.findReserveByStudentId(id));
        if (temp.isPresent()) {
            reserveService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
