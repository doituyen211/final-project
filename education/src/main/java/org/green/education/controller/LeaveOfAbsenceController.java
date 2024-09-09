package org.green.education.controller;

import org.green.education.entity.LeaveOfAbsence;
import org.green.education.service.LeaveOfAbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/reservation")
public class LeaveOfAbsenceController {

    @Autowired
    private LeaveOfAbsenceService leaveOfAbsenceService;

    @GetMapping("/{id}")
    public ResponseEntity<LeaveOfAbsence> getReserveByStudentId(@PathVariable int id) {
        return new ResponseEntity<>(leaveOfAbsenceService.findReserveByStudentId(id), HttpStatus.OK);
    }




    @PostMapping("/addReserved")
    public ResponseEntity<LeaveOfAbsence> createReserved(@RequestBody LeaveOfAbsence leaveOfAbsence) {
        try{
            LeaveOfAbsence leaveOfAbsence1 = leaveOfAbsenceService.save(leaveOfAbsence);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Custom-Header", "CreatedProduct");
            return new ResponseEntity<>(leaveOfAbsence1, headers, HttpStatus.CREATED);

        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeaveOfAbsence> updateReserved(@PathVariable int id, @RequestBody LeaveOfAbsence leaveOfAbsence) {
        try {
            LeaveOfAbsence updatedLeaveOfAbsence = leaveOfAbsenceService.updateReserved(id, leaveOfAbsence);
            return new ResponseEntity<>(updatedLeaveOfAbsence, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("delete-reserve/{id}")
    public ResponseEntity<LeaveOfAbsence> deleteGrade(@PathVariable int id) {
        Optional<LeaveOfAbsence> temp = Optional.ofNullable(leaveOfAbsenceService.findReserveByStudentId(id));
        if (temp.isPresent()) {
            leaveOfAbsenceService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
