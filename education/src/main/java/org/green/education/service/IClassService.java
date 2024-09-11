package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.ClassDTO;
import org.green.education.dto.ClassMemberDTO;
import org.green.education.entity.Class;
import org.green.education.form.ClassForm;

import java.time.LocalDate;
import java.util.List;


public interface IClassService {
    CoreResponse<?> getClassById(int classId);

    CoreResponse<?> getClassList();

    CoreResponse<?> getStudentByClassId(int classId);

    CoreResponse<?> createClass(ClassForm classForm);

    CoreResponse<?> editClass(int classId, ClassForm classForm);

    CoreResponse<?> findByClassNameContainingIgnoreCase(String className);

    CoreResponse<?> findByStartDateAndEndDate(LocalDate startDate, LocalDate endDate);
}
