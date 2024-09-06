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
        Student student = iStudentRepository.findById(gradeForm.getStudentId()).orElseThrow(() -> new RuntimeException("Student not found"));
        ExamSchedule examSchedule = iExamScheduleRepository.findById(gradeForm.getExamScheduleId()).orElseThrow(() -> new RuntimeException("Exam schedule not found"));

        Grade grade = new Grade();
        grade.setStudent(student);
        grade.setExamSchedule(examSchedule);
        grade.setGrade(gradeForm.getGrade());
        grade.setStatus(gradeForm.getStatus());

        iGradeRepository.save(grade);
        return gradeForm;
    }

    @Override
    public Grade updateGrade(int id, Grade newGrade) {
//        Grade grade = iGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found"));
//
//        if (newGrade.getStudent() != null) {
//            if (!iStudentRepository.existsById(newGrade.getStudent().getId())) {
//                throw new RuntimeException("Referenced Student does not exist");
//            }
//        }
//        if (newGrade.getExamSchedule() != null) {
//            if (!iExamScheduleRepository.existsById(newGrade.getExamSchedule().getId())) {
//                throw new RuntimeException("Referenced ExamSchedule does not exist");
//            }
//        }
//
//        grade.setGrade(newGrade.getGrade());
//        grade.setStatus(newGrade.getStatus());
//        grade.setStudent(newGrade.getStudent());
//        grade.setExamSchedule(newGrade.getExamSchedule());
//
//        Grade updateGrade =  iGradeRepository.save(grade);
//        return new GradeDTO(updateGrade);
        return null;

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
