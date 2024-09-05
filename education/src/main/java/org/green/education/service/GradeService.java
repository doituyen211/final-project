package org.green.education.service;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.Grade;
import org.green.education.repository.IExamScheduleRepository;
import org.green.education.repository.IGradeRepository;
import org.green.education.repository.IStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public GradeDTO getGradeById(int id) {
        Grade grade = iGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found"));
        return new GradeDTO(grade);
    }

    @Override
    public GradeDTO addGrade(Grade grade) {

        if (grade.getStudent() != null) {
            if (!iStudentRepository.existsById(grade.getStudent().getId())) {
                throw new RuntimeException("Referenced Student does not exist");
                // Alternatively, you might redirect to a page to add the student
            }
        }
        if (grade.getExamSchedule() != null) {
            if (!iExamScheduleRepository.existsById(grade.getExamSchedule().getId())) {
                throw new RuntimeException("Referenced ExamSchedule does not exist");
                // Alternatively, you might redirect to a page to add the exam schedule
            }
        }

        Grade addNewGrade =  iGradeRepository.save(grade);
        return new GradeDTO(addNewGrade);
    }

    @Override
    public List<Grade> getAllGrade() {
        return iGradeRepository.findAll();
    }

    @Override
    public GradeDTO updateGrade(int id, Grade newGrade) {
        Grade grade = iGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found"));

        if (newGrade.getStudent() != null) {
            if (!iStudentRepository.existsById(newGrade.getStudent().getId())) {
                throw new RuntimeException("Referenced Student does not exist");
                // Alternatively, you might redirect to a page to add the student
            }
        }
        if (newGrade.getExamSchedule() != null) {
            if (!iExamScheduleRepository.existsById(newGrade.getExamSchedule().getId())) {
                throw new RuntimeException("Referenced ExamSchedule does not exist");
                // Alternatively, you might redirect to a page to add the exam schedule
            }
        }

        grade.setGrade(newGrade.getGrade());
        grade.setStatus(newGrade.getStatus());
        grade.setStudent(newGrade.getStudent());
        grade.setExamSchedule(newGrade.getExamSchedule());

        Grade updateGrade =  iGradeRepository.save(grade);
        return new GradeDTO(updateGrade);
    }

    @Override
    public void deleteGrade(int id) {
        iGradeRepository.deleteById(id);
    }

    @Override
    public List<GradeDTO> getStudentGrade() {
        return iGradeRepository.findStudentGrades();
    }
}
