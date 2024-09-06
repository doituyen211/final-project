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

//    @PostMapping
//    public ResponseEntity<Reserved> createReserved(@RequestBody Reserved reserved) {
//        try{
//            ReservedDTO createdReservedDTO= reserveService.save(reserved);
//            HttpHeaders headers = new HttpHeaders();
//            headers.add("Custom-Header", "CreatedProduct");
//            return new ResponseEntity<>(ReservedDTO, headers, HttpStatus.CREATED);
//
//        }catch (RuntimeException e){
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @PutMapping
//    public ResponseEntity<Reserved> updateReserved(@PathVariable int id, @RequestBody Reserved reserved) {
//        try {
////            Grade updatedGrade = impGradeService.updateGrade(id, grade);
//            ReservedDTO updatedReservedDTO = reserveService.updateReserved(id, reserved);
//            return new ResponseEntity<>(updatedReservedDTO, HttpStatus.OK);
//        } catch (RuntimeException e) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//    }

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
