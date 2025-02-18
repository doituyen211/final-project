package org.green.education.service;

import org.green.education.dto.ExamScheduleDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Class;
import org.green.education.entity.ExamSchedule;
import org.green.education.entity.Subject;
import org.green.education.repository.ClassRepository;
import org.green.education.repository.IExamScheduleRepository;
import org.green.education.repository.ISubjectRepository;
import org.green.education.response.ExamScheduleListResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public List<ExamScheduleDTO> findAllExamSchedule() {
        List<ExamScheduleDTO> examscheduleDTOList = new ArrayList<>();
        List<ExamSchedule> examSchedules = examScheduleRepository.findAllExamSchedule();
        for (ExamSchedule examschedule : examSchedules) {
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
    public ExamScheduleDTO findExamScheduleById(Integer id) {
        Optional<ExamSchedule> examScheduleOptional = examScheduleRepository.findById(id);
        if (examScheduleOptional.isPresent()){
            ExamSchedule examSchedule = examScheduleOptional.get();
            return ExamScheduleDTO.builder()
                    .id(examSchedule.getId())
                    .examLink(examSchedule.getExamLink())
                    .subject(examSchedule.getSubject().getSubjectName())
                    .classField(examSchedule.getClassField().getClassName())
                    .examDate(examSchedule.getExamDate())
                    .status(examSchedule.getStatus())
                    .build();
        }
        else {
            throw new RuntimeException("ExamSchedule với ID không tồn tại");
        }

    }

    @Override
    public ExamScheduleDTO addExamSchedule(ExamScheduleDTO examScheduleDTO) {
        Optional<Subject> subjectOptional = subjectRepository.findSubjectBySubjectName(examScheduleDTO.getSubject());
        Optional<Class> classOptional = classRepository.findByClassName(examScheduleDTO.getClassField());
        if (subjectOptional.isPresent() && classOptional.isPresent()) {
            // Chuyển DTO thành entity
            ExamSchedule examSchedule = new ExamSchedule();
            examSchedule.setSubject(subjectOptional.get());
            examSchedule.setClassField(classOptional.get());
            examSchedule.setExamDate(examScheduleDTO.getExamDate());
            examSchedule.setExamLink(examScheduleDTO.getExamLink());
            examSchedule.setStatus(examScheduleDTO.getStatus());

            // Lưu vào cơ sở dữ liệu
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
            System.out.println("subjectOptional: " + subjectOptional);
            Optional<Class> classOptional = classRepository.findByClassName(examScheduleDTO.getClassField());
            System.out.println("classOptional: " + classOptional);
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
            examSchedule.setStatus(examScheduleDTO.getStatus());

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
    @Override
    public List<SubjectDto> getSubjectsByClassId(Integer classId) {
        Optional<Class> classOptional = classRepository.findById(classId);
        if (classOptional.isPresent()) {
            Class cls = classOptional.get();
            List<Subject> subjects = subjectRepository.findByTrainingProgram_ProgramId(cls.getProgram().getProgramId());
            return subjects.stream()
                    .map(subject -> SubjectDto.builder()
                            .subjectId(subject.getSubjectId())
                            .subjectName(subject.getSubjectName())
                            .trainingDuration(subject.getTrainingDuration())
                            .status(subject.getStatus())
                            .trainingProgramId(subject.getTrainingProgram().getProgramId())
                            .build())
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("Class với ID không tồn tại");
        }
    }

    @Override
    public ExamScheduleListResponse getExamSchedulePaged(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page,size);
        Page<ExamSchedule> examSchedulePage = examScheduleRepository.findAll(pageRequest);

        List<ExamScheduleDTO> examScheduleDTOList = new ArrayList<>();

        for (ExamSchedule examSchedule : examSchedulePage) {
            ExamScheduleDTO examScheduleDTO = ExamScheduleDTO.builder()
                    .id(examSchedule.getId())
                    .examLink(examSchedule.getExamLink())
                    .subject(examSchedule.getSubject().getSubjectName())
                    .classField(examSchedule.getClassField().getClassName())
                    .examDate(examSchedule.getExamDate())
                    .status(examSchedule.getStatus())
                    .build();
            examScheduleDTOList.add(examScheduleDTO);
        }
        return new ExamScheduleListResponse(examScheduleDTOList,examSchedulePage.getTotalPages());
    }

}
