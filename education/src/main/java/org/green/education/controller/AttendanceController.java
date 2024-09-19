package org.green.education.controller;

import lombok.RequiredArgsConstructor;
import org.green.core.model.CoreResponse;
import org.green.education.service.AttendanceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    @GetMapping("/sumAttendance")
    public CoreResponse<?> getSumAttendanceByClasIdAndStudentId(@RequestParam int classId, @RequestParam int studentId) {
        return attendanceService.getSumAttendanceByClassIdAndStudentId(classId, studentId);
    }

    @GetMapping("/attendanceDetailByStudent")
    public CoreResponse<?> getAttendanceDetailByStudentId(@RequestParam int studentId,
                                                          @RequestParam int classId,
                                                          @RequestParam int subjectId   ) {
        return attendanceService.getAttendanceDetailByClassIdAndStudentIdAndSubjectId( studentId,classId,subjectId);
    }
}
