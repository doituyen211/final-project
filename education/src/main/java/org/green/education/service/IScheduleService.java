package org.green.education.service;

import org.green.education.entity.ClassSchedule;
import org.green.education.entity.ClassSchedule;
import org.green.education.form.ScheduleForm;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public interface IScheduleService {
    Optional<ClassSchedule> getScheduleById(int id);

    ClassSchedule addSchedule(ClassSchedule classSchedule);
    List<ClassSchedule> getAllSchedule();
    List<ClassSchedule> getAllSchedule(int page , int limit);


//    ClassSchedule updateSchedule(int id, ClassSchedule newSchedule);

    void deleteSchedule(int id);


    ScheduleForm updateNewSchedule(int id, ScheduleForm scheduleDTO);
    //
//    List<ClassSchedule> getSchedule();
    List<ClassSchedule> searchByClassName(String className);
    List<ClassSchedule> searchBySubjectName(String subjectName);
}
