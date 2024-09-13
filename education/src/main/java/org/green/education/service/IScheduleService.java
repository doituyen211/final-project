package org.green.education.service;

import org.green.education.dto.ScheduleDTO;
import org.green.education.entity.ClassSchedule;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public interface IScheduleService {
    Optional<ClassSchedule> getScheduleById(int id);

    ClassSchedule addSchedule(ClassSchedule classSchedule);

    List<ClassSchedule> getAllSchedule();

//    ClassSchedule updateSchedule(int id, ClassSchedule newSchedule);

    void deleteSchedule(int id);


    ClassSchedule updateNewSchedule(int id, ScheduleDTO scheduleDTO);
//
//    List<ScheduleDTO> getSchedule();
}
