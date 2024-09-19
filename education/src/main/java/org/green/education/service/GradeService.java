package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.GradeDTO;
import org.green.education.entity.*;
import org.green.education.form.GradeForm;
import org.green.education.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
            List<Grade> gradeList = iGradeRepository.getActiveGrade();
            for (Grade grade : gradeList) {
                GradeDTO gradeDTO = GradeDTO.builder()
                        .id(grade.getId())
                        .studentName(grade.getStudent().getFullName())
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
                    .data(null)
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
            grade.setActivate(true);

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
                    .data(null)
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
                    .data(null)
                    .build();
        }
    }

    @Override
    public CoreResponse<?> deletingGrade(int id) {
        try {
            Grade grade = iGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found for update"));

            grade.setActivate(false);
            iGradeRepository.save(grade);

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Delete Grade Successfully")
                    .data(null)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .data(null)
                    .build();
        }
    }

    @Override
    public CoreResponse<?> getAllGradeByExamDate() {
        try {
            List<Object[]> gradeObjects = iGradeRepository.findAllGrade();

            // Map Object[] to GradeDTO
            List<GradeDTO> gradeDTOList = gradeObjects.stream()
                    .map(obj -> new GradeDTO(
                            (Integer) obj[0],          // id
                            (String) obj[1],     // student name
                            (Integer) obj[2],        // grade
                            (LocalDate) obj[3],        // exam date
                            (String) obj[4],        // subject name
                            (String) obj[5],        // programName
                            (String) obj[6],       // status
                            (String) obj[7]         // course name
                    ))
                    .toList();

            // Continue with your business logic...
            Map<String, List<GradeDTO>> gradesByStudent = gradeDTOList.stream()
                    .collect(Collectors.groupingBy(GradeDTO::getStudentName));

            List<Map<String, Object>> responseData = new ArrayList<>();

            for (Map.Entry<String, List<GradeDTO>> entry : gradesByStudent.entrySet()) {
                List<GradeDTO> studentGrades = entry.getValue();
                Map<String, Object> result = new HashMap<>();

                List<Integer> scoreList = studentGrades.stream()
                        .map(GradeDTO::getGrade)
                        .toList();

                int firstScore = !scoreList.isEmpty() ? scoreList.get(0) : 0;
                int secondScore = scoreList.size() > 1 ? scoreList.get(1) : 0;
                int thirdScore = scoreList.size() > 2 ? scoreList.get(2) : 0;

                double averageGrade = scoreList.stream().mapToInt(Integer::intValue).average().orElse(0.0);
                String status = averageGrade >= 50 ? "Graduation" : "Failed Graduation";

                result.put("Status Graduation", status);
                result.put("First Score", firstScore);
                result.put("Second Score", secondScore);
                result.put("Third Score", thirdScore);
                result.put("Average Grade", averageGrade);
                result.put("grade", studentGrades);

                responseData.add(result);
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
                    .data(null)
                    .build();
        }
    }

    @Override
    public CoreResponse<?> getAllSubjectGrade() {
        try {
            List<Map<String, Object>> subjects = getList(iGradeRepository.getSubjectNameForGrade(), "subject_id", "subject_name");

            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Get Subject for Grade Successfully")
                    .data(subjects)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .data(null)
                    .build();
        }
    }

    @Override
    public CoreResponse<?> getAllTrainingGrade() {
        try {
            List<Map<String, Object>> programs = getList(iGradeRepository.getProgramNameForGrade(), "program_id", "program_name");
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Get Training Program for Grade Successfully")
                    .data(programs)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .data(null)
                    .build();
        }
    }

    @Override
    public CoreResponse<?> getAllStudentGrade() {
        try {
            List<Map<String, Object>> students = getList(iGradeRepository.getStudentForGrade(), "student_id", "student_name");
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Get Subject for Grade Successfully")
                    .data(students)
                    .build();
        } catch (Exception exp) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(exp.getMessage())
                    .data(null)
                    .build();
        }
    }

    private List<Map<String, Object>> getList(List<Object[]> iGradeRepository, String g_id, String g_name) {
        List<Map<String, Object>> lists = new ArrayList<>();

        for (Object[] list : iGradeRepository) {
            int id = (Integer) list[0];
            String name = (String) list[1];

            Map<String, Object> listMap = new HashMap<>();
            listMap.put(g_id, id);
            listMap.put(g_name, name);

            lists.add(listMap);
        }
        return lists;
    }

}

