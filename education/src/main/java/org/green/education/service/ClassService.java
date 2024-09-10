package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.ClassDTO;
import org.green.education.dto.ClassMemberDTO;
import org.green.education.entity.Class;
import org.green.education.entity.TrainingProgram;
import org.green.education.form.ClassForm;
import org.green.education.repository.ClassRepository;
import org.green.education.repository.ITrainingProgramRepository;
import org.green.education.response.ClassListResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClassService implements IClassService {
    @Autowired
    ClassRepository classRepository;

    @Autowired
    ITrainingProgramRepository trainingProgramRepository;

    // If id invalid in DB then use try catch to handle exception
    @Override
    public CoreResponse<?> getClassById(int classId) {
        try {
            Class presentClass = classRepository.findById(classId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học nào với id " + classId));

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Get class successfully")
                    .data(presentClass)
                    .build();

        } catch (RuntimeException e) {
            return CoreResponse.builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message(e.getMessage())
                    .data(null)
                    .build();

        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("An unexpected error occurred")
                    .data(null)
                    .build();
        }

    }

    @Override
    public CoreResponse<?> getClassList(int page, int limit) {
        try {
            PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("id").descending());

            Page<Class> classList = classRepository.findAll(pageRequest);

            Page<ClassDTO> classDTOList = classList.map(item -> ClassDTO.builder()
                    .className(item.getClassName())
                    .classSize(item.getClassSize())
                    .startDate(item.getStartDate())
                    .endDate(item.getEndDate())
                    .trainingProgramName(item.getProgram().getProgramName())
                    .build());

            ClassListResponse classListResponse = ClassListResponse.builder()
                    .data(classDTOList.getContent())
                    .totalPages(classDTOList.getTotalPages())
                    .build();

            String message = classDTOList.getContent().isEmpty() ? "Empty list" : "Get list successfully";

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message(message)
                    .data(classListResponse)
                    .build();

        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message(e.getMessage())
                    .data(null)
                    .build();
        }
    }

    // If id invalid in DB then use try catch to handle exception
    @Override
    public CoreResponse<?> getStudentByClassId(int classId, int page, int limit) {
        try {
            PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("id").descending());

            Page<ClassMemberDTO> classMemberDTO = classRepository.getListStudentByClassId(classId, pageRequest);

            ClassListResponse classListResponse = ClassListResponse.builder()
                    .data(classMemberDTO.getContent())
                    .totalPages(classMemberDTO.getTotalPages())
                    .build();

            String message = classMemberDTO.getContent().isEmpty() ? "Empty list" : "Get list successfully";

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message(message)
                    .data(classListResponse)
                    .build();

        } catch (RuntimeException e) {
            return CoreResponse.builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message(e.getMessage())
                    .data(null)
                    .build();

        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("An unexpected error occurred")
                    .data(null)
                    .build();
        }
    }

    @Override
    public CoreResponse<?> createClass(ClassForm classForm) {
        try {
            TrainingProgram trainingProgram = trainingProgramRepository.findById(classForm.getProgramId())
                    .orElseThrow(() -> new Exception("Không tìm thấy chương trình đào tạo với id là " + classForm.getProgramId()));

            Class newClass = new Class();
            newClass.setClassName(classForm.getClassName());
            newClass.setClassSize(classForm.getClassSize());
            newClass.setStartDate(classForm.getStartDate());
            newClass.setEndDate(classForm.getEndDate());
            newClass.setProgram(trainingProgram);

            classRepository.save(newClass);

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Add successfully")
                    .data(classForm)
                    .build();

        } catch (RuntimeException e) {
            return CoreResponse.builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message(e.getMessage())
                    .data(null)
                    .build();

        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("An unexpected error occurred")
                    .data(null)
                    .build();
        }
    }

    @Override
    public CoreResponse<?> editClass(int classId, ClassForm classForm) {
        try {
            Class presentClass = classRepository.findById(classId).orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học nào với id " + classId));

            TrainingProgram trainingProgram = trainingProgramRepository.findById(classForm.getProgramId()).orElseThrow(() -> new RuntimeException("Không tìm thấy chương trình đào tạo với id là " + classForm.getProgramId()));

            presentClass.setProgram(trainingProgram);
            presentClass.setClassName(classForm.getClassName());
            presentClass.setClassSize(classForm.getClassSize());
            presentClass.setStartDate(classForm.getStartDate());
            presentClass.setEndDate(classForm.getEndDate());

            classRepository.save(presentClass);

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Edit successfully")
                    .data(classForm)
                    .build();

        } catch (RuntimeException e) {
            return CoreResponse.builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message(e.getMessage())
                    .data(null)
                    .build();

        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("An unexpected error occurred")
                    .data(null)
                    .build();
        }

    }

}

