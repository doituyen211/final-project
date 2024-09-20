package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.ClassDTO;
import org.green.education.dto.ClassMemberDTO;
import org.green.education.entity.Class;
import org.green.education.entity.ClassMember;
import org.green.education.entity.ClassMembers;
import org.green.education.entity.TrainingProgram;
import org.green.education.form.ClassForm;
import org.green.education.repository.ClassRepository;
import org.green.education.repository.IClassMembersRepository;
import org.green.education.repository.ITrainingProgramRepository;
import org.green.education.response.ClassListResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassService implements IClassService {
    @Autowired
    ClassRepository classRepository;

    @Autowired
    ITrainingProgramRepository trainingProgramRepository;

    @Autowired
    IClassMembersRepository iClassMembersRepository;

    // If id invalid in DB then use try catch to handle exception
    @Override
    public CoreResponse<?> getClassById(int classId) {
        try {
            Class presentClass = classRepository.findById(classId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học nào với id " + classId));

            ClassDTO classDTO = ClassDTO.builder()
                    .id(presentClass.getId())
                    .className(presentClass.getClassName())
                    .classSize(presentClass.getClassSize())
                    .startDate(presentClass.getStartDate())
                    .endDate(presentClass.getEndDate())
                    .trainingProgramName(presentClass.getProgram().getProgramName())
                    .build();

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Get class successfully")
                    .data(classDTO)
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
    public CoreResponse<?> getClassList() {
        try {
            List<Class> classList = classRepository.getClassIsActive();

            classList.forEach(item -> {
                if (item.getEndDate().isBefore(LocalDate.now())) {
                    item.setStatus(false);
                } else {
                    item.setStatus(true);
                }

                int classSize = iClassMembersRepository.countStudentsByClassId(item.getId());
                item.setClassSize(classSize);

                classRepository.save(item);
            });


            List<ClassDTO> classDTOList = classList.stream()
                    .map(item -> ClassDTO.builder()
                            .id(item.getId())
                            .className(item.getClassName())
                            .classSize(item.getClassSize())
                            .startDate(item.getStartDate())
                            .endDate(item.getEndDate())
                            .trainingProgramName(item.getProgram().getProgramName())
                            .status(item.isStatus())
                            .active(item.getActive())
                            .build())
                    .sorted(Comparator.comparing(ClassDTO::getId).reversed())
                    .collect(Collectors.toList());

            String message = classDTOList.isEmpty() ? "Empty list" : "Get list successfully";

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message(message)
                    .data(classDTOList)
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
    public CoreResponse<?> getStudentByClassId(int classId) {
        try {
            List<ClassMemberDTO> classMemberDTO = classRepository.getListStudentByClassId(classId);

            String message = classMemberDTO.isEmpty() ? "Empty list" : "Get list successfully";

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message(message)
                    .data(classMemberDTO)
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

            int classSize = iClassMembersRepository.countStudentsByClassId(newClass.getId());

            newClass.setClassName(classForm.getClassName());
            newClass.setClassSize(classSize);
            newClass.setStartDate(classForm.getStartDate());
            newClass.setEndDate(classForm.getEndDate());
            newClass.setProgram(trainingProgram);
            newClass.setActive(true);

            if (classForm.getEndDate().isAfter(LocalDate.now()) || classForm.getEndDate().isEqual(LocalDate.now())) {
                newClass.setStatus(true);
            } else {
                newClass.setStatus(false);
            }

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
            Class presentClass = classRepository.findById(classId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học nào với id " + classId));

            TrainingProgram trainingProgram = trainingProgramRepository.findById(classForm.getProgramId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy chương trình đào tạo với id là " + classForm.getProgramId()));

            presentClass.setProgram(trainingProgram);
            presentClass.setClassName(classForm.getClassName());
//            presentClass.setClassSize(classForm.getClassSize());
            presentClass.setStartDate(classForm.getStartDate());
            presentClass.setEndDate(classForm.getEndDate());

            if (classForm.getEndDate().isBefore(LocalDate.now())) {
                presentClass.setStatus(false);
            } else {
                presentClass.setStatus(true);
            }

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

    @Override
    public CoreResponse<?> findByClassNameContainingIgnoreCase(String className) {
        try {
            List<Class> classList = classRepository.findByClassNameContainingIgnoreCase(className);

            List<ClassDTO> classDTOS = classList.stream()
                    .map(item -> ClassDTO.builder()
                            .id(item.getId())
                            .className(item.getClassName())
                            .classSize(item.getClassSize())
                            .startDate(item.getStartDate())
                            .endDate(item.getEndDate())
                            .trainingProgramName(item.getProgram().getProgramName())
                            .status(item.isStatus())
                            .active(item.getActive())
                            .build())
                    .sorted(Comparator.comparing(ClassDTO::getId))
                    .collect(Collectors.toList());

            String message = classDTOS.isEmpty()
                    ? "Empty list" : "Get list successfully";

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message(message)
                    .data(classDTOS)
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
    public CoreResponse<?> findByStartDateAndEndDate(LocalDate startDate, LocalDate endDate) {
        try {
            List<Class> classList = classRepository.findByStartDateAndEndDate(startDate, endDate);

            List<ClassDTO> classDTOS = classList.stream()
                    .map(item -> ClassDTO.builder()
                            .id(item.getId())
                            .className(item.getClassName())
                            .classSize(item.getClassSize())
                            .startDate(item.getStartDate())
                            .endDate(item.getEndDate())
                            .trainingProgramName(item.getProgram().getProgramName())
                            .status(item.isStatus())
                            .active(item.getActive())
                            .build())
                    .sorted(Comparator.comparing(ClassDTO::getId))
                    .collect(Collectors.toList());

            String message = classDTOS.isEmpty() ? "Empty list" : "Search successfully";

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message(message)
                    .data(classDTOS)
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
    public CoreResponse<?> deleteClass(int classId) {
        try {
            Class presentClass = classRepository.findById(classId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học này"));

            presentClass.setActive(false);
            classRepository.save(presentClass);

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("delete successfully")
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .build();
        }
    }
}

