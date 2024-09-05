package org.green.education.service;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.Grade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IGradeService {

    Grade getGradeById(int id);

    Grade addGrade(Grade grade);

    Grade updateGrade(int id, Grade newGrade);

    void deleteGrade(int id);

    List<GradeDTO> getStudentGrade();
}
