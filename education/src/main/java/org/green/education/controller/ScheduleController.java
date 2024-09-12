package org.green.education.controller;

import org.green.education.dto.ClassScheduleDto;
import org.green.education.entity.ClassSchedule;
import org.green.education.form.ScheduleForm;
import org.green.education.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/schedule")
@CrossOrigin(origins = "http://localhost:3000")
public class ScheduleController {
    @Autowired
    private ScheduleService impScheduleService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllSchedule() {
        return new ResponseEntity<>(impScheduleService.getAllSchedule(), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(@RequestParam("page") int page, @RequestParam("limit") int limit
    ) {
        return new ResponseEntity<>(impScheduleService.getAllSchedule(page, limit), HttpStatus.OK);
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
    public ResponseEntity<?> updateSchedule(@PathVariable("id") int id, @RequestBody ScheduleForm scheduleDTO) {
        Optional<ClassSchedule> existingSchedule = impScheduleService.getScheduleById(id);
        if (existingSchedule.isPresent()) {
            ScheduleForm updatedSchedule = impScheduleService.updateNewSchedule(id, scheduleDTO);
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
//    @GetMapping("/search")
//    public ResponseEntity<?> search(@RequestParam(value = "className", required = false) String className,
//                                    @RequestParam(value = "subjectName", required = false) String subjectName) {
//        if (className != null) {
//            List<ScheduleDTO> results = impScheduleService.searchByClassName(className);
//            return new ResponseEntity<>(results, HttpStatus.OK);
//        } else if (subjectName != null) {
//            List<ScheduleDTO> results = impScheduleService.searchBySubjectName(subjectName);
//            return new ResponseEntity<>(results, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }

//    @GetMapping("/search")
//    public ResponseEntity<?> search(@RequestParam(value = "className", required = false) String className,
//                                    @RequestParam(value = "subjectName", required = false) String subjectName) {
//        if (className != null) {
//            List<ScheduleDTO> results = impScheduleService.searchByClassName(className);
//            return new ResponseEntity<>(results, HttpStatus.OK);
//        } else if (subjectName != null) {
//            List<ScheduleDTO> results = impScheduleService.searchBySubjectName(subjectName);
//            return new ResponseEntity<>(results, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }


//    @GetMapping("/search")
//    public ResponseEntity<?> search(
//            @RequestParam(value = "className", required = false) String encodedClassName,
//            @RequestParam(value = "subjectName", required = false) String encodedSubjectName) {
//
//        String className = null;
//        String subjectName = null;
//
//        // Giải mã Base64 nếu có giá trị
//        if (encodedClassName != null) {
//            className = new String(Base64.getDecoder().decode(encodedClassName));
//        }
//        if (encodedSubjectName != null) {
//            subjectName = new String(Base64.getDecoder().decode(encodedSubjectName));
//        }
//
//        // Xử lý tìm kiếm theo className hoặc subjectName đã giải mã
//        if (className != null) {
//            List<ScheduleDTO> results = impScheduleService.searchByClassName(className);
//            return new ResponseEntity<>(results, HttpStatus.OK);
//        } else if (subjectName != null) {
//            List<ScheduleDTO> results = impScheduleService.searchBySubjectName(subjectName);
//            return new ResponseEntity<>(results, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(value = "subjectName", required = false) String subjectName) {
        System.out.println("Received subjectName: " + subjectName);
        if (subjectName != null && !subjectName.isEmpty()) {
            // Tìm kiếm theo subjectName
            List<ScheduleDTO> results = impScheduleService.searchBySubjectName(subjectName);
            return new ResponseEntity<>(results, HttpStatus.OK);
        } else {
            // Trả về lỗi nếu subjectName bị thiếu hoặc rỗng
            return new ResponseEntity<>("Subject name is required", HttpStatus.BAD_REQUEST);
        }
    }
}