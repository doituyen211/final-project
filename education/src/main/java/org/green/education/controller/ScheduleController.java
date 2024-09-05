package org.green.education.controller;

import org.green.education.dto.ScheduleDTO;
import org.green.education.entity.ClassSchedule;
import org.green.education.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/schedule")
@CrossOrigin(origins = "http://localhost:3000")
public class ScheduleController {
    @Autowired
    private ScheduleService impScheduleService;

    @GetMapping
    public ResponseEntity<?> getAllSchedule() {
        return new ResponseEntity<>(impScheduleService.getAllSchedule(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable int id) {
        return new ResponseEntity<>(impScheduleService.getScheduleById(id), HttpStatus.OK);
    }

    @PostMapping("/add-schedule")
    public ResponseEntity<ClassSchedule> addSchedule(@RequestBody ClassSchedule classSchedule) {
        ClassSchedule createdSchedule = impScheduleService.addSchedule(classSchedule);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Custom-Header", "CreatedProduct");
        return new ResponseEntity<>(createdSchedule, headers, HttpStatus.CREATED);

    }

    @PutMapping("/update-schedule/{id}")
    public ResponseEntity<ClassSchedule> updateSchedule(@PathVariable("id") int id, @RequestBody ScheduleDTO scheduleDTO) {
        Optional<ClassSchedule> existingSchedule = impScheduleService.getScheduleById(id);
        if (existingSchedule.isPresent()) {
            ClassSchedule updatedSchedule = impScheduleService.updateNewSchedule(id, scheduleDTO);
            return new ResponseEntity<>(updatedSchedule, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("delete-schedule/{id}")
    public ResponseEntity<ClassSchedule> deleteSchedule(@PathVariable int id) {
        Optional<ClassSchedule> existingSchedule = impScheduleService.getScheduleById(id);
        if (existingSchedule.isPresent()) {
            impScheduleService.deleteSchedule(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
