package org.green.education.service.implement;

import org.green.education.dto.test.GradeDTO;
import org.green.education.entity.Grade;
import org.green.education.repository.GradeRepository;
import org.green.education.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImpGradeService implements GradeService {

    @Autowired
    private GradeRepository gradeRepository;

    @Override
    public Optional<Grade> getGradeById(int id) {
//        return Optional.of(gradeRepository.findById(id).get());

        return gradeRepository.findById(id);
    }

    @Override
    public Grade addGrade(Grade grade) {
        return gradeRepository.save(grade);
    }

    @Override
    public List<Grade> getAllGrade() {
        return gradeRepository.findAll();
    }

    @Override
    public Grade updateGrade(int id, Grade newGrade) {
        Grade grade = gradeRepository.findById(id).orElseThrow(() -> new RuntimeException("grade not found"));

        grade.setId(newGrade.getId());
        grade.setGrade(newGrade.getGrade());
        grade.setStatus(newGrade.getStatus());
        return gradeRepository.save(grade);
    }

    @Override
    public void deleteGrade(int id) {
        gradeRepository.deleteById(id);
    }

    @Override
    public List<GradeDTO> getStudentGrade() {
        return gradeRepository.findStudentGrades();
    }
}
