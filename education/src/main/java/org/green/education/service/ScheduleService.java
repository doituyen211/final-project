package org.green.education.service;

import jakarta.transaction.Transactional;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
    @Transactional
    public void deleteSchedule(int id) {
        scheduleRepository.softDelete(id);
    }


    @Override
    public ScheduleForm updateNewSchedule(int id, ScheduleForm scheduleForm) {
        ClassSchedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        Subject subject = subjectRepository.findById(scheduleForm.getSubjectId()).orElseThrow(() -> new RuntimeException("subject not found"));
        Class myClass = classRepository.findById(scheduleForm.getClassId()).orElseThrow(() -> new RuntimeException("class not found"));

        schedule.setSubject(subject);
        schedule.setTime(scheduleForm.getTime());
        schedule.setStartTime(scheduleForm.getStartTime());
        schedule.setEndTime(scheduleForm.getEndTime());
        schedule.setMyClass(myClass);
        schedule.setClassroom(scheduleForm.getClassRoom());
        schedule.setStaffId(scheduleForm.getStaffId());

        scheduleRepository.save(schedule);
        return scheduleForm;
    }


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

    @Override
    public ScheduleForm addSchedule(ScheduleForm scheduleForm) {
        Subject subject = subjectRepository.findById(scheduleForm.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject không tìm thấy"));

        Class myClass = classRepository.findById(scheduleForm.getClassId())
                .orElseThrow(() -> new RuntimeException("Class không tìm thấy"));

        ClassSchedule classSchedule = new ClassSchedule();
        classSchedule.setSubject(subject);
        classSchedule.setTime(scheduleForm.getTime());
        classSchedule.setStartTime(scheduleForm.getStartTime());
        classSchedule.setEndTime(scheduleForm.getEndTime());
        classSchedule.setMyClass(myClass);
        classSchedule.setClassroom(scheduleForm.getClassRoom());
        classSchedule.setStaffId(scheduleForm.getStaffId());

         scheduleRepository.save(classSchedule);

        return scheduleForm;
    }

    @Override
    public List<Map<String, String>> getDistinctClassNames() {
        return scheduleRepository.findDistinctClassNames();
    }

    @Override
    public List<Map<String, String>> getDistinctClassrooms() {
        return scheduleRepository.findDistinctClassrooms();
    }

    @Override
    public List<Map<String, String>> getDistinctStaffIds() {
        return scheduleRepository.findDistinctStaffIds();
    }

    @Override
    public List<Map<String, String>> getDistinctSubjectNames() {
        return scheduleRepository.findDistinctSubjectNames();
    }
}
