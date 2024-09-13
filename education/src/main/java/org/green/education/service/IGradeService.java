package org.green.education.service;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.Grade;
import org.green.education.form.GradeForm;
import org.springframework.stereotype.Service;
import org.green.core.model.CoreResponse;


import java.util.List;

@Service
public interface IGradeService {

    Grade getGradeById(int id);

//    GradeForm addGrade(GradeForm gradeForm);
//
//    GradeForm updateGrade(int id, GradeForm newGrade);
//
//    void deleteGrade(int id);
//
//    List<GradeDTO> getStudentGrade();

    CoreResponse<?> getAllGrade();
    CoreResponse<?> addingGrade(GradeForm gradeForm);
    CoreResponse<?> updatingGrade(int id, GradeForm gradeForm);
    CoreResponse<?> deletingGrade(int id);

}
