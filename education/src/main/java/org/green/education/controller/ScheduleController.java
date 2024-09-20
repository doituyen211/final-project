package org.green.education.controller;

import org.green.education.dto.ClassScheduleDto;
import org.green.education.entity.ClassSchedule;
import org.green.education.form.ScheduleForm;
import org.green.education.repository.IScheduleRepository;
import org.green.education.service.IScheduleService;
import org.green.education.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.green.core.model.CoreResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @Autowired
    private IScheduleRepository scheduleRepository;

    @Autowired
    private IScheduleService scheduleService;

    @GetMapping("/all")
    public CoreResponse<?> getAllSchedule() {
        try {
            List<ClassScheduleDto> scheduleDTOList = new ArrayList<>();
            List<ClassSchedule> scheduleList = scheduleRepository.findAll();
            for (ClassSchedule schedule : scheduleList) {
                ClassScheduleDto classScheduleDTO = ClassScheduleDto.builder()
                        .Id(schedule.getId())
                        .subjectName(schedule.getSubject().getSubjectName())
                        .time(schedule.getTime())
                        .startTime(schedule.getStartTime())
                        .endTime(schedule.getEndTime())
                        .className(schedule.getMyClass().getClassName())
                        .classRoom(schedule.getClassroom())
                        .StaffId(schedule.getStaffId())
                        .status(schedule.getStatus())
                        .build();
                scheduleDTOList.add(classScheduleDTO);
            }
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("fetch all successfully")
                    .data(scheduleDTOList)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }

    @GetMapping("")
    public CoreResponse<?> getAll(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        try {
            List<ClassScheduleDto> scheduleList = scheduleService.getAllSchedule(page, limit);
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("fetch all successfully")
                    .data(scheduleList)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }

    @GetMapping("/{id}")
    public CoreResponse<?> getScheduleById(@PathVariable int id) {
        try {
            Optional<ClassSchedule> schedule = scheduleService.getScheduleById(id);
            if (schedule.isPresent()) {
                ClassScheduleDto classScheduleDTO = ClassScheduleDto.builder()
                        .Id(schedule.get().getId())
                        .subjectName(schedule.get().getSubject().getSubjectName())
                        .time(schedule.get().getTime())
                        .startTime(schedule.get().getStartTime())
                        .endTime(schedule.get().getEndTime())
                        .className(schedule.get().getMyClass().getClassName())
                        .classRoom(schedule.get().getClassroom())
                        .StaffId(schedule.get().getStaffId())
                        .build();
                return CoreResponse.builder()
                        .code(HttpStatus.OK.value())
                        .message("fetch schedule successfully")
                        .data(classScheduleDTO)
                        .build();
            } else {
                return CoreResponse.builder()
                        .code(HttpStatus.NOT_FOUND.value())
                        .message("Schedule not found")
                        .build();
            }
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }

    @PutMapping("/update-schedule/{id}")
    public CoreResponse<?> updateSchedule(@PathVariable("id") int id, @RequestBody ScheduleForm scheduleDTO) {
        try {
            Optional<ClassSchedule> existingSchedule = scheduleService.getScheduleById(id);
            if (existingSchedule.isPresent()) {
                ScheduleForm updatedSchedule = scheduleService.updateNewSchedule(id, scheduleDTO);
                return CoreResponse.builder()
                        .code(HttpStatus.OK.value())
                        .message("update schedule successfully")
                        .data(updatedSchedule)
                        .build();
            } else {
                return CoreResponse.builder()
                        .code(HttpStatus.NOT_FOUND.value())
                        .message("Schedule not found")
                        .build();
            }
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }

    @DeleteMapping("/delete-schedule/{id}")
    public CoreResponse<?> deleteSchedule(@PathVariable int id) {
        try {
            Optional<ClassSchedule> existingSchedule = scheduleService.getScheduleById(id);
            if (existingSchedule.isPresent()) {
                scheduleService.deleteSchedule(id);
                return CoreResponse.builder()
                        .code(HttpStatus.OK.value())
                        .message("delete schedule successfully")
                        .build();
            } else {
                return CoreResponse.builder()
                        .code(HttpStatus.NOT_FOUND.value())
                        .message("Schedule not found")
                        .build();
            }
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }


    @GetMapping("/search")
    public CoreResponse<?> search(@RequestParam(value = "className", required = false) String className,
                                  @RequestParam(value = "subjectName", required = false) String subjectName) {
        try {
            List<ClassScheduleDto> results;
            if (className != null) {
                results = scheduleService.searchByClassName(className);
            } else if (subjectName != null) {
                results = scheduleService.searchBySubjectName(subjectName);
            } else {
                return CoreResponse.builder()
                        .code(HttpStatus.BAD_REQUEST.value())
                        .message("Invalid search parameters")
                        .build();
            }
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("search results fetched successfully")
                    .data(results)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }


    @PostMapping("/add-schedule")
    public CoreResponse<?> addSchedule(@RequestBody ScheduleForm scheduleForm) {
        try {
            ScheduleForm createdSchedule = scheduleService.addSchedule(scheduleForm);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Custom-Header", "CreatedProduct");
            return CoreResponse.builder()
                    .code(HttpStatus.CREATED.value())
                    .message("schedule created successfully")
                    .data(createdSchedule)
                    .build();
        } catch (RuntimeException e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }


    @GetMapping("/select_listClass_name")
    public CoreResponse<?> getClassNames() {
        try {
            List<Map<String, String>> classNames = scheduleService.getDistinctClassNames();
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Class names fetched successfully")
                    .data(classNames)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }

    @GetMapping("/select_class_room")
    public CoreResponse<?> getClassrooms() {
        try {
            List<Map<String, String>> classrooms = scheduleService.getDistinctClassrooms();
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Classrooms fetched successfully")
                    .data(classrooms)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }

    @GetMapping("/select_staff_name")
    public CoreResponse<?> getStaffIds() {
        try {
            List<Map<String, String>> staffIds = scheduleService.getDistinctStaffIds();
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Staff IDs fetched successfully")
                    .data(staffIds)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }

    @GetMapping("/select_subject_name")
    public CoreResponse<?> getDistinctSubjectNames() {
        try {
            List<Map<String, String>> subjectNames = scheduleService.getDistinctSubjectNames();
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Subject names fetched successfully")
                    .data(subjectNames)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }
}   