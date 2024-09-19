package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.GradeDTO;
import org.green.education.dto.ProgramDTO;
import org.green.education.dto.StudentDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.*;
import org.green.education.form.GradeForm;
import org.green.education.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GradeService implements IGradeService {

    @Autowired
    private IGradeRepository iGradeRepository;

    @Autowired
    private IStudentRepository iStudentRepository;

    @Autowired
    private IExamScheduleRepository iExamScheduleRepository;

    @Autowired
    private ITrainingProgramRepository iTrainingProgramRepository;

    @Autowired
    private ISubjectRepository iSubjectRepository;

    @Override
    public Grade getGradeById(int id) {
        return iGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found"));
    }

    @Override
    public CoreResponse<?> getAllGrade() {
        try {
            List<GradeDTO> gradeDTOList = new ArrayList<>();
            List<Grade> gradeList = iGradeRepository.findAll();
            for (Grade grade : gradeList) {
                GradeDTO gradeDTO = GradeDTO.builder()
                        .id(grade.getId())
                        .studenName(grade.getStudent().getFullName())
                        .subjectName(grade.getExamSchedule().getSubject().getSubjectName())
                        .grade(grade.getGrade())
                        .status(grade.getStatus())
                        .examDate(grade.getExamSchedule().getExamDate())
                        .programName(grade.getExamSchedule().getSubject().getTrainingProgram().getProgramName())
                        .courseName(grade.getExamSchedule().getSubject().getTrainingProgram().getCourse().getCourseName())
                        .build();
                gradeDTOList.add(gradeDTO);
            }
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Get All Grade Successfully")
                    .data(gradeDTOList)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .build();
        }
    }

    @Override
    public CoreResponse<?> addingGrade(GradeForm gradeForm) {
        try {
            Student student = iStudentRepository.findById(gradeForm.getStudentId()).orElseThrow(() -> new RuntimeException("Student not found for add"));
            ExamSchedule examSchedule = iExamScheduleRepository.findById(gradeForm.getExamScheduleId()).orElseThrow(() -> new RuntimeException("Exam schedule not found for add"));
            TrainingProgram trainingProgram = iTrainingProgramRepository.findById(gradeForm.getTrainingProgramId()).orElseThrow(() -> new RuntimeException("Training program not found"));

            Subject subject = iSubjectRepository.findById(gradeForm.getSubjectId())
                    .orElseThrow(() -> new RuntimeException("Subject not found"));
            if (!subject.getTrainingProgram().getProgramId().equals(gradeForm.getTrainingProgramId())) {
                throw new RuntimeException("Subject does not belong to the provided training program");
            }

            gradeForm.setStatus(gradeForm.getGrade() >= 50 ? "Passed" : "Fail");

            Grade grade = new Grade();
            grade.setStudent(student);
            grade.setExamSchedule(examSchedule);
            grade.setGrade(gradeForm.getGrade());
            grade.setStatus(gradeForm.getStatus());

            iGradeRepository.save(grade);
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Add Grade Successfully")
                    .data(gradeForm)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .build();
        }
    }

    @Override
    public CoreResponse<?> updatingGrade(int id, GradeForm newGrade) {
        try {
            Student student = iStudentRepository.findById(newGrade.getStudentId()).orElseThrow(() -> new RuntimeException("Student not found for add"));
            ExamSchedule examSchedule = iExamScheduleRepository.findById(newGrade.getExamScheduleId()).orElseThrow(() -> new RuntimeException("Exam schedule not found for add"));
            Grade grade = iGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found for update"));

            newGrade.setStatus(newGrade.getGrade() >= 50 ? "Passed" : "Fail");

            grade.setGrade(newGrade.getGrade());
            grade.setStatus(newGrade.getStatus());
            grade.setStudent(student);
            grade.setExamSchedule(examSchedule);

            iGradeRepository.save(grade);
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Update Grade Successfully")
                    .data(newGrade)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .build();
        }
    }

    @Override
    public CoreResponse<?> deletingGrade(int id) {
        Grade existingGrade = getGradeById(id);
        try {
            if (existingGrade != null) {
                iGradeRepository.deleteById(id);
            }
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Delete Grade Successfully")
                    .build();

        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .build();
        }
    }


    @Override
    public CoreResponse<?> getAllGradeByExamDate() {
        try {
            List<Grade> grades = iGradeRepository.findAll();

            // Group grades by student ID
            Map<Integer, List<Grade>> gradesByStudent = grades.stream()
                    .collect(Collectors.groupingBy(grade -> grade.getStudent().getId()));

            List<Map<String, Object>> responseData = new ArrayList<>();

            for (Map.Entry<Integer, List<Grade>> entry : gradesByStudent.entrySet()) {
                List<Grade> studentGrades = entry.getValue();
                Map<String, Object> result = new HashMap<>();

                // Calculate scores and average
                List<Integer> scoreList = studentGrades.stream()
                        .map(Grade::getGrade)
                        .toList();

                int firstScore = !scoreList.isEmpty() ? scoreList.get(0) : 0;
                int secondScore = scoreList.size() > 1 ? scoreList.get(1) : 0;
                int thirdScore = scoreList.size() > 2 ? scoreList.get(2) : 0;
                double averageGrade = scoreList.stream().mapToInt(Integer::intValue).average().orElse(0.0);
                String status = averageGrade >= 50 ? "Graduation" : "Failed Graduation";

                result.put("Status", status);
                result.put("First Score", firstScore);
                result.put("Second Score", secondScore);
                result.put("Third Score", thirdScore);
                result.put("Average Grade", averageGrade);

                // Prepare the grades for this student
                List<GradeDTO> gradeDTOList = studentGrades.stream()
                        .map(grade -> GradeDTO.builder()
                                .id(grade.getId())
                                .studenName(grade.getStudent().getFullName())
                                .subjectName(grade.getExamSchedule().getSubject().getSubjectName())
                                .grade(grade.getGrade())
                                .status(grade.getStatus())
                                .examDate(grade.getExamSchedule().getExamDate())
                                .programName(grade.getExamSchedule().getSubject().getTrainingProgram().getProgramName())
                                .courseName(grade.getExamSchedule().getSubject().getTrainingProgram().getCourse().getCourseName())
                                .build())
                        .collect(Collectors.toList());

                // Add result and grades to the response
                Map<String, Object> studentResult = new HashMap<>(result);
                studentResult.put("grade", gradeDTOList);
                responseData.add(studentResult);
            }

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Getting Grade By Exam Date Successfully")
                    .data(responseData)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .build();
        }
    }

    @Override
    public CoreResponse<?> getAllSubjectGrade() {
        try {
            List<SubjectDto> subjectDtoList = iGradeRepository.getSubjectNameForGrade();
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Get Subject for Grade Successfully")
                    .data(subjectDtoList)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .build();
        }
    }

    @Override
    public CoreResponse<?> getAllTrainingGrade() {
        try {
            List<ProgramDTO> programDTOList = iGradeRepository.getProgramNameForGrade();
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Get All Grade Successfully")
                    .data(programDTOList)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .build();
        }
    }

    @Override
    public CoreResponse<?> getAllStudentGrade() {
        try {
            List<StudentDTO> studentDTOList = iGradeRepository.getStudentForGrade();
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Get All Grade Successfully")
                    .data(studentDTOList)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .build();
        }
    }

}

