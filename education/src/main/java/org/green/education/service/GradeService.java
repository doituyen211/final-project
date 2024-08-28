package org.green.education.service;

import org.green.education.entity.Grade;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface GradeService {

    Optional<Grade> getGradeById(int id);

    Grade addGrade(Grade grade);

    List<Grade> getAllGrade();

    Grade updateGrade(int id, Grade newGrade);

    void deleteGrade(int id);

}
