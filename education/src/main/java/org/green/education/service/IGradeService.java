package org.green.education.service;

import org.green.education.dto.ProgramDTO;
import org.green.education.dto.StudentDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Grade;
import org.green.education.entity.Student;
import org.green.education.entity.Subject;
import org.green.education.entity.TrainingProgram;
import org.green.education.form.GradeForm;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.green.core.model.CoreResponse;

import java.util.List;

@Service
public interface IGradeService {

    Grade getGradeById(int id);
    CoreResponse<?> getAllGrade();
    CoreResponse<?> addingGrade(GradeForm gradeForm);
    CoreResponse<?> updatingGrade(int id, GradeForm gradeForm);
    CoreResponse<?> deletingGrade(int id);

    CoreResponse<?> getAllGradeByExamDate();

//    CoreResponse<?> getAllSubjectGrade();
//    CoreResponse<?> getAllTrainingGrade();
//    CoreResponse<?> getAllStudentGrade();

}
