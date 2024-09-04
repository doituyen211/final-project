package org.green.education.service;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.Grade;
import org.green.education.repository.IGradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService implements IGradeService {

    @Autowired
    private IGradeRepository IGradeRepository;

    @Override
    public GradeDTO getGradeById(int id) {
//        return Optional.of(gradeRepository.findById(id).get());

        Grade grade = IGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found"));
        return new GradeDTO(grade);
    }

    @Override
    public Grade addGrade(Grade grade) {
        return IGradeRepository.save(grade);
    }

    @Override
    public List<Grade> getAllGrade() {
        return IGradeRepository.findAll();
    }

    @Override
    public Grade updateGrade(int id, GradeDTO newGrade) {
        Grade grade = IGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("grade not found"));

        grade.setGrade(newGrade.getGrade());
        grade.setStatus(newGrade.getStatus());
        return IGradeRepository.save(grade);
    }

    @Override
    public void deleteGrade(int id) {
        IGradeRepository.deleteById(id);
    }
//
//    @Override
//    public List<GradeDTO> getStudentGrade() {
//        try {
//            return IGradeRepository.findStudentGrades();
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        return null;
//    }

}
