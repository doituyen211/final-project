package org.green.education.service;

import org.green.education.dto.ExamScheduleDTO;
import org.green.education.entity.Class;
import org.green.education.entity.ExamSchedule;
import org.green.education.entity.Subject;
import org.green.education.repository.ClassRepository;
import org.green.education.repository.IExamScheduleRepository;
import org.green.education.repository.ISubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExamScheduleService implements IExamScheduleService {

    private final IExamScheduleRepository examScheduleRepository;
    private final ISubjectRepository subjectRepository;
    private final ClassRepository classRepository;

    @Autowired
    public ExamScheduleService(IExamScheduleRepository examScheduleRepository,
                               ISubjectRepository subjectRepository,
                               ClassRepository classRepository) {
        this.examScheduleRepository = examScheduleRepository;
        this.subjectRepository = subjectRepository;
        this.classRepository = classRepository;
    }

    @Override
    public List<ExamScheduleDTO> getExamSchedule() {
        List<ExamScheduleDTO> examscheduleDTOList = new ArrayList<>();
        List<ExamSchedule> gradeList = examScheduleRepository.findAll();
        for (ExamSchedule examschedule : gradeList) {
            ExamScheduleDTO examScheduleledto = ExamScheduleDTO.builder()
                    .id(examschedule.getId())
                    .examLink(examschedule.getExamLink())
                    .subject(examschedule.getSubject().getSubjectName())
                    .classField(examschedule.getClassField().getClassName())
                    .examDate(examschedule.getExamDate())
                    .status(examschedule.getStatus())
                    .build();
            examscheduleDTOList.add(examScheduleledto);
        }
        return examscheduleDTOList;
    }

    @Override
    public ExamScheduleDTO addExamSchedule(ExamScheduleDTO examScheduleDTO) {
        Optional<Subject> subjectOptional = subjectRepository.findSubjectBySubjectName(examScheduleDTO.getSubject());
        Optional<Class> classOptional = classRepository.findByClassName(examScheduleDTO.getClassField());
        if (subjectOptional.isPresent() && classOptional.isPresent()) {
            ExamSchedule examSchedule = new ExamSchedule();
            examSchedule.setSubject(subjectOptional.get());
            examSchedule.setClassField(classOptional.get());
            examSchedule.setExamDate(examScheduleDTO.getExamDate());
            examSchedule.setExamLink(examScheduleDTO.getExamLink());
            examSchedule.setStatus(examScheduleDTO.getStatus());

            // Save examSchedule to database
            ExamSchedule savedExamSchedule = examScheduleRepository.save(examSchedule);

            // Returns DTO after successful save
            return examScheduleDTO.builder()
                    .id(savedExamSchedule.getId())
                    .subject(savedExamSchedule.getSubject().getSubjectName())
                    .classField(savedExamSchedule.getClassField().getClassName())
                    .examDate(savedExamSchedule.getExamDate())
                    .examLink(savedExamSchedule.getExamLink())
                    .status(savedExamSchedule.getStatus())
                    .build();
        } else {
            throw new RuntimeException("Subject hoặc Class không tồn tại");
        }
    }

    @Override
    public ExamScheduleDTO updateExamSchedule(ExamScheduleDTO examScheduleDTO) {
        Optional<ExamSchedule> examScheduleOptional = examScheduleRepository.findById(examScheduleDTO.getId());
        if (examScheduleOptional.isPresent()) {
            ExamSchedule examSchedule = examScheduleOptional.get();

            //update
            Optional<Subject> subjectOptional = subjectRepository.findSubjectBySubjectName(examScheduleDTO.getSubject());
            Optional<Class> classOptional = classRepository.findByClassName(examScheduleDTO.getClassField());
            if (subjectOptional.isPresent() && classOptional.isPresent()) {
                examSchedule.setSubject(subjectOptional.get());
                examSchedule.setClassField(classOptional.get());
                examSchedule.setExamDate(examScheduleDTO.getExamDate());
                examSchedule.setExamLink(examScheduleDTO.getExamLink());
                examSchedule.setStatus(examScheduleDTO.getStatus());
                //save to database
                ExamSchedule examScheduleUpdated = examScheduleRepository.save(examSchedule);

                return ExamScheduleDTO.builder()
                        .id(examScheduleUpdated.getId())
                        .subject(examScheduleUpdated.getSubject().getSubjectName())
                        .classField(examScheduleUpdated.getClassField().getClassName())
                        .examDate(examScheduleUpdated.getExamDate())
                        .examLink(examScheduleUpdated.getExamLink())
                        .status(examScheduleUpdated.getStatus())
                        .build();
            } else {
                throw new RuntimeException("Subject hoặc Class không tồn tại");
            }
        } else {
            throw new RuntimeException("ExamSchedule với ID không tồn tại");
        }
    }

    @Override
    public ExamScheduleDTO deleteExamSchedule(ExamScheduleDTO examScheduleDTO) {
        Optional<ExamSchedule> examScheduleOptional = examScheduleRepository.findById(examScheduleDTO.getId());
        if (examScheduleOptional.isPresent()) {
            ExamSchedule examSchedule = examScheduleOptional.get();
            examSchedule.setStatus(true);

            ExamSchedule updatedExamSchedule = examScheduleRepository.save(examSchedule);
            return ExamScheduleDTO.builder()
                    .id(updatedExamSchedule.getId())
                    .subject(updatedExamSchedule.getSubject().getSubjectName())
                    .classField(updatedExamSchedule.getClassField().getClassName())
                    .examDate(updatedExamSchedule.getExamDate())
                    .examLink(updatedExamSchedule.getExamLink())
                    .status(updatedExamSchedule.getStatus())
                    .build();
        } else {
            throw new RuntimeException("ExamSchedule với ID không tồn tại");
        }
    }
}
