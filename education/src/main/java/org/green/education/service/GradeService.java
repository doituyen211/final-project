package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.GradeDTO;
import org.green.education.entity.*;
import org.green.education.form.GradeForm;
import org.green.education.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public CoreResponse<?> getGradeByExamDate(int studentId) {
        try {

            List<Grade> grades = iGradeRepository.findByStudent_IdOrderByExamSchedule_ExamDateAsc(studentId);
            Map<String, Object> result = new HashMap<>();
            int totalGrades = grades.size();
            double averageGrade = 0.0;

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

            for (int i = 0; i < totalGrades; i++) {
                Grade grade = grades.get(i);
                averageGrade += grade.getGrade();

                if (i == 0) {
                    result.put("First Score", grade.getGrade());
                } else if (i == 1) {
                    result.put("Second Score", grade.getGrade());
                } else if (i == 2) {
                    result.put("Third Score", grade.getGrade());
                }
            }

            // Calculate average
            averageGrade = averageGrade / totalGrades;

            // Set status based on average grade
            String status = (averageGrade >= 50) ? "Passed" : "Failed";
            result.put("Average Grade", averageGrade);
            result.put("Status", status);
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Getting Grade By Exam Date Successfully")
                    .data(result)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .build();
        }
    }
}

