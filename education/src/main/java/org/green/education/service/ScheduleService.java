package org.green.education.service;


import org.green.education.dto.ScheduleDTO;
import org.green.education.entity.ClassSchedule;
import org.green.education.repository.IScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService implements IScheduleService {
    @Autowired
    private IScheduleRepository scheduleRepository;

    @Override
    public Optional<ClassSchedule> getScheduleById(int id) {
        return scheduleRepository.findById(id);
    }

    @Override
    public ClassSchedule addSchedule(ClassSchedule classSchedule) {
        return scheduleRepository.save(classSchedule);
    }

    @Override
    public List<ClassSchedule> getAllSchedule() {
        return scheduleRepository.findAll();
    }


    @Override
    public void deleteSchedule(int id) {
        scheduleRepository.deleteById(id);
    }

    @Override
    public ClassSchedule updateNewSchedule(int id, ScheduleDTO scheduleDTO) {
        ClassSchedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));

        schedule.setSubjectId(scheduleDTO.getSubjectId());
        schedule.setTime(scheduleDTO.getTime());
        schedule.setStartTime(scheduleDTO.getStartTime());
        schedule.setEndTime(scheduleDTO.getEndTime());
        schedule.setClassId(scheduleDTO.getClassId());
        schedule.setClassroom(scheduleDTO.getClassRoom());
        schedule.setStaffId(scheduleDTO.getStaffId());

        return scheduleRepository.save(schedule);
    }


//    @Override
//    public List<ScheduleDTO> getSchedule() {
//        try {
//            return scheduleRepository.findSchedule();
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        return null;
//    }
}
