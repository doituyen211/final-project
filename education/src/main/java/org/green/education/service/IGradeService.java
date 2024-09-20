package org.green.education.service;

import org.green.education.entity.Grade;
import org.green.education.form.GradeForm;
import org.springframework.stereotype.Service;
import org.green.core.model.CoreResponse;

@Service
public interface IGradeService {

    Grade getGradeById(int id);
    CoreResponse<?> getAllGrade();
    CoreResponse<?> addingGrade(GradeForm gradeForm);
    CoreResponse<?> updatingGrade(int id, GradeForm gradeForm);
    CoreResponse<?> deletingGrade(int id);

    CoreResponse<?> getAllGradeByExamDate();

    CoreResponse<?> getAllSubjectGrade();
    CoreResponse<?> getAllTrainingGrade();
    CoreResponse<?> getAllStudentGrade();

}
