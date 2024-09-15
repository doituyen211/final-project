package org.green.education.service;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.ExamSchedule;
import org.green.education.entity.Grade;
import org.green.education.entity.Student;
import org.green.education.form.GradeForm;
import org.green.education.repository.IExamScheduleRepository;
import org.green.education.repository.IGradeRepository;
import org.green.education.repository.IStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("DuplicatedCode")
@Service
public class GradeService implements IGradeService {

    @Autowired
    private IGradeRepository iGradeRepository;

    @Autowired
    private IStudentRepository iStudentRepository;

    @Autowired
    private IExamScheduleRepository iExamScheduleRepository;

    @Override
    public Grade getGradeById(int id) {
        return iGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found"));
    }

    @Override
    public GradeForm addGrade(GradeForm gradeForm) {
        Student student = iStudentRepository.findById(gradeForm.getStudentId()).orElseThrow(() -> new RuntimeException("Student not found for add"));
        ExamSchedule examSchedule = iExamScheduleRepository.findById(gradeForm.getExamScheduleId()).orElseThrow(() -> new RuntimeException("Exam schedule not found for add"));

        Grade grade = new Grade();
        grade.setStudent(student);
        grade.setExamSchedule(examSchedule);
        grade.setGrade(gradeForm.getGrade());
        grade.setStatus(gradeForm.getStatus());

        iGradeRepository.save(grade);
        return gradeForm;
    }

    @Override
    public GradeForm updateGrade(int id, GradeForm newGrade) {
        Student student = iStudentRepository.findById(newGrade.getStudentId()).orElseThrow(() -> new RuntimeException("Student not found for add"));
        ExamSchedule examSchedule = iExamScheduleRepository.findById(newGrade.getExamScheduleId()).orElseThrow(() -> new RuntimeException("Exam schedule not found for add"));
        Grade grade = iGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found for update"));

        grade.setGrade(newGrade.getGrade());
        grade.setStatus(newGrade.getStatus());
        grade.setStudent(student);
        grade.setExamSchedule(examSchedule);

        iGradeRepository.save(grade);
        return newGrade;
    }

    @Override
    public void deleteGrade(int id) {
        iGradeRepository.deleteById(id);
    }

    @Override
    public List<GradeDTO> getStudentGrade() {
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
        return  gradeDTOList;
    }
}
