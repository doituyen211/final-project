package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Subject;
import org.green.education.entity.TrainingProgram;
import org.green.education.form.SubjectFilterForm;
import org.green.education.repository.ISubjectRepository;
import org.green.education.repository.ITrainingProgramRepository;
import org.green.education.specification.SubjectSpecification;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SubjectService implements ISubjectService {
    @Autowired
    private ISubjectRepository subjectRepository ;
    @Autowired
    private ITrainingProgramRepository programRepository ;
    @Autowired
    private ModelMapper mapper ;

    @Override
    @Transactional
    public CoreResponse<String> create(SubjectDto subjectDto) {
        Subject subject = mapper.map(subjectDto, Subject.class);

        Optional<TrainingProgram> optionalProgram = programRepository.findById(subjectDto.getTrainingProgramId());
        if (optionalProgram.isEmpty()) {
            return CoreResponse.<String>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Training Program not found.")
                    .data(null)
                    .build();
        }

        subject.setTrainingProgram(optionalProgram.get());
        subjectRepository.save(subject);

        return CoreResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .message("Add successful!")
                .data("Add successful!")
                .build();
    }


    @Override
    public CoreResponse<?> findAllNotPaging() {
        List<Subject> subjects = subjectRepository.findAll(Sort.by(Sort.Direction.ASC, "subjectId"));

        List<SubjectDto> subjectDtos = subjects.stream().map(subject -> {
            SubjectDto subjectDto = mapper.map(subject, SubjectDto.class);
            subjectDto.setTrainingProgramId(subject.getTrainingProgram().getProgramId());
            return subjectDto;
        }).toList();

        return CoreResponse.builder()
                .code(200)
                .message("Subjects retrieved successfully")
                .data(subjectDtos)
                .build();
    }

    @Override
    public CoreResponse<?> findALL(SubjectFilterForm form ,  int page , int pageSize,
                                  String sortDir, String sortBy     ) {
        //searc
        Specification<Subject> spec = SubjectSpecification.buildSpec(form) ;

        //Sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending() ;

        //Paging
        Pageable pageable = PageRequest.of(page,pageSize,sort) ;

        Page<Subject> subjects = subjectRepository.findAll(spec,pageable) ;

        Map<String, Object> response = new HashMap<>();
        response.put("page",page);
        response.put("pageSize",pageSize) ;
        response.put("totalPages",subjects.getTotalPages()) ;
        response.put("totalElements",subjects.getTotalElements()) ;
        response.put("content", subjects.getContent().stream().map(subject -> {
            SubjectDto subjectDto = mapper.map(subject, SubjectDto.class) ;
            subjectDto.setTrainingProgramId(subject.getTrainingProgram().getProgramId());
            return subjectDto ;
        }  ).toList() );

        return CoreResponse.<Map<String, Object>>builder()
                .code(HttpStatus.OK.value())
                .message("Subjects retrieved successfully.")
                .data(response)
                .build();
    }

    @Override
    public CoreResponse<?> findById(Integer id) {
        Optional<Subject> optionalSubject = subjectRepository.findById(id);
        if (optionalSubject.isEmpty()) {
            return CoreResponse.<String>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Subject not found.")
                    .data(null)
                    .build();
        }

        SubjectDto subjectDto = mapper.map(optionalSubject.get(), SubjectDto.class);
        return CoreResponse.<SubjectDto>builder()
                .code(HttpStatus.OK.value())
                .message("Subject found.")
                .data(subjectDto)
                .build();
    }


    @Override
    @Transactional
    public CoreResponse<?> updateById(Integer id, SubjectDto subjectDto) {
        Optional<Subject> optionalSubject = subjectRepository.findById(id);
        if (optionalSubject.isEmpty()) {
            return CoreResponse.<String>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Subject not found.")
                    .data(null)
                    .build();
        }

        Subject subject = optionalSubject.get();
        mapper.map(subjectDto, subject);
        Optional<TrainingProgram> optionalProgram = programRepository.findById(subjectDto.getTrainingProgramId());

        if (optionalProgram.isEmpty()) {
            return CoreResponse.<String>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Training Program not found.")
                    .data(null)
                    .build();
        }

        subject.setTrainingProgram(optionalProgram.get());
        subjectRepository.save(subject);

        return CoreResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .message("Update successful!")
                .data(null)
                .build();
    }

    @Override
    @Transactional
    public CoreResponse<?> deleteById(Integer id) {
        if (subjectRepository.findById(id).isEmpty()) {
            return CoreResponse.<String>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("Cannot find Subject by Id: " + id)
                    .data(null)
                    .build();
        }

        subjectRepository.deleteById(id);

        return CoreResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .message("Delete successful!")
                .data(null)
                .build();
    }
}
