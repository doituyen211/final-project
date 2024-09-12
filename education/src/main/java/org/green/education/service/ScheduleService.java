package org.green.education.service;

import org.green.education.dto.ClassScheduleDto;
import org.green.education.entity.Class;
import org.green.education.entity.ClassSchedule;
import org.green.education.entity.Subject;
import org.green.education.form.ScheduleForm;
import org.green.education.repository.ClassRepository;
import org.green.education.repository.IScheduleRepository;
import org.green.education.repository.ISubjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ScheduleService implements IScheduleService {
    @Autowired
    private IScheduleRepository scheduleRepository;
    @Autowired
    private ISubjectRepository subjectRepository;
    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private ModelMapper mapper ;
    @Override
    public Optional<ClassSchedule> getScheduleById(int id) {
        return scheduleRepository.findById(id);
    }

    @Override
    public ClassSchedule addSchedule(ClassSchedule classSchedule) {
        return scheduleRepository.save(classSchedule);
    }


    @Override
    public List<ClassScheduleDto> getAllSchedule(int page, int limit) {
        List<ClassScheduleDto> listScheduleDTO= new ArrayList<>();
        Pageable  pageable = PageRequest.of(page, limit, Sort.by("id").descending());
        Page<ClassSchedule> schedules = scheduleRepository.findAll(pageable);
        for (ClassSchedule classSchedule : schedules) {
            ClassScheduleDto scheduleDTO = new ClassScheduleDto();
            scheduleDTO.setId(classSchedule.getId());
            scheduleDTO.setSubjectName(classSchedule.getSubject().getSubjectName());
            scheduleDTO.setTime(classSchedule.getTime());
            scheduleDTO.setStartTime(classSchedule.getStartTime());
            scheduleDTO.setEndTime(classSchedule.getEndTime());
            scheduleDTO.setClassName(classSchedule.getMyClass().getClassName());
            scheduleDTO.setClassRoom(classSchedule.getClassroom());
            scheduleDTO.setStaffId(classSchedule.getStaffId());
            listScheduleDTO.add(scheduleDTO);
        }
        return listScheduleDTO;
    }
    @Override
//    public List<ScheduleDTO> getAllSchedule() {
//        List<ScheduleDTO> listScheduleDTO= new ArrayList<>();
//        List<ClassSchedule> schedules = scheduleRepository.findAll();
//        for (ClassSchedule classSchedule : schedules) {
//            ScheduleDTO scheduleDTO = new ScheduleDTO();
//            scheduleDTO.setId(classSchedule.getId());
//            scheduleDTO.setSubjectName(classSchedule.getSubject().getSubjectName());
//            scheduleDTO.setTime(classSchedule.getTime());
//            scheduleDTO.setStartTime(classSchedule.getStartTime());
//            scheduleDTO.setEndTime(classSchedule.getEndTime());
//            scheduleDTO.setClassName(classSchedule.getMyClass().getClassName());
//            scheduleDTO.setClassRoom(classSchedule.getClassroom());
//            scheduleDTO.setStaffId(classSchedule.getStaffId());
//            listScheduleDTO.add(scheduleDTO);
//        }
//        return listScheduleDTO;
//    }
    public List<ClassScheduleDto> getAllSchedule() {
        return scheduleRepository.findAll().stream()
                .map(classSchedule -> {
                    ClassScheduleDto scheduleDTO = mapper.map(classSchedule, ClassScheduleDto.class);

                    scheduleDTO.setSubjectName(classSchedule.getSubject().getSubjectName());
                    scheduleDTO.setClassName(classSchedule.getMyClass().getClassName());
                    scheduleDTO.setClassRoom(classSchedule.getClassroom());

                    return scheduleDTO;
                })
                .collect(Collectors.toList());
    }


    @Override
    public void deleteSchedule(int id) {
        scheduleRepository.deleteById(id);
    }

    @Override
    public ScheduleForm updateNewSchedule(int id, ScheduleForm scheduleDTO) {
        ClassSchedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        Subject subject = subjectRepository.findById(scheduleDTO.getSubjectId()).orElseThrow(() -> new RuntimeException("subject not found"));
        Class myClass = classRepository.findById(scheduleDTO.getClassId()).orElseThrow(() -> new RuntimeException("class not found"));
        schedule.setSubject(subject);
        schedule.setTime(scheduleDTO.getTime());
        schedule.setStartTime(scheduleDTO.getStartTime());
        schedule.setEndTime(scheduleDTO.getEndTime());
        schedule.setMyClass(myClass);
        schedule.setClassroom(scheduleDTO.getClassRoom());
        schedule.setStaffId(scheduleDTO.getStaffId());

        scheduleRepository.save(schedule);
        return scheduleDTO;
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

    @Override
    public List<ClassScheduleDto> searchByClassName(String className) {
        List<ClassSchedule> schedules = scheduleRepository.findByClassNameContaining(className);
        return schedules.stream()
                .map(classSchedule -> {
                    ClassScheduleDto scheduleDTO = mapper.map(classSchedule, ClassScheduleDto.class);
                    scheduleDTO.setSubjectName(classSchedule.getSubject().getSubjectName());
                    scheduleDTO.setClassName(classSchedule.getMyClass().getClassName());
                    scheduleDTO.setClassRoom(classSchedule.getClassroom());
                    return scheduleDTO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ClassScheduleDto> searchBySubjectName(String subjectName) {
        List<ClassSchedule> schedules = scheduleRepository.findBySubjectNameContaining(subjectName);
        return schedules.stream()
                .map(classSchedule -> {
                    ClassScheduleDto scheduleDTO = mapper.map(classSchedule, ClassScheduleDto.class);
                    scheduleDTO.setSubjectName(classSchedule.getSubject().getSubjectName());
                    scheduleDTO.setClassName(classSchedule.getMyClass().getClassName());
                    scheduleDTO.setClassRoom(classSchedule.getClassroom());
                    return scheduleDTO;
                })
                .collect(Collectors.toList());
    }
}
