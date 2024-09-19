package org.green.education.service;

import org.green.education.dto.ClassScheduleDto;
import org.green.education.entity.ClassSchedule;
import org.green.education.form.ScheduleForm;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public interface IScheduleService {
    Optional<ClassSchedule> getScheduleById(int id);

    ClassSchedule addSchedule(ClassSchedule classSchedule);
    List<ClassScheduleDto> getAllSchedule();
    List<ClassScheduleDto> getAllSchedule(int page , int limit);


    void deleteSchedule(int id);

    ScheduleForm updateNewSchedule(int id, ScheduleForm scheduleDTO);

    List<ClassScheduleDto> searchByClassName(String className);
    List<ClassScheduleDto> searchBySubjectName(String subjectName);

    ScheduleForm addSchedule(ScheduleForm scheduleForm);

    List<Map<String, String>> getDistinctSubjectNames();
    List<Map<String, String>> getDistinctClassNames();
    List<Map<String, String>> getDistinctClassrooms();
    List<Map<String, String>> getDistinctStaffIds();
}
