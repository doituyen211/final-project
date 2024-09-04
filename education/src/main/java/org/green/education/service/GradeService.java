package org.green.education.service;

import org.green.education.dto.GradeDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Grade;
import org.green.education.repository.IGradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradeService implements IGradeService {

    @Autowired
    private IGradeRepository IGradeRepository;

    @Override
    public Optional<Grade> getGradeById(int id) {
//        return Optional.of(gradeRepository.findById(id).get());

        return IGradeRepository.findById(id);
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
    public Grade updateGrade(int id, Grade newGrade) {
        Grade grade = IGradeRepository.findById(id).orElseThrow(() -> new RuntimeException("grade not found"));

        grade.setId(newGrade.getId());
        grade.setGrade(newGrade.getGrade());
        grade.setStatus(newGrade.getStatus());
        return IGradeRepository.save(grade);
    }

    @Override
    public void deleteGrade(int id) {
        IGradeRepository.deleteById(id);
    }

    @Override
    public List<GradeDTO> getStudentGrade() {
        try {
            return IGradeRepository.findStudentGrades();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

//    @Override
//    public List<SubjectDto> getAllSubject() {
//        try {
//            return IGradeRepository.getSubject();
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        return null;
//    }
}
