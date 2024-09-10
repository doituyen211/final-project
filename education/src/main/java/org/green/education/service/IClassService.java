package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.ClassDTO;
import org.green.education.dto.ClassMemberDTO;
import org.green.education.entity.Class;
import org.green.education.form.ClassForm;

import java.util.List;


public interface IClassService {
    CoreResponse<?> getClassList(int page, int limit);

    CoreResponse<?> getStudentByClassId(int classId, int page, int limit);

    CoreResponse<?> createClass(ClassForm classForm);

    CoreResponse<?> editClass(int classId, ClassForm classForm);

    CoreResponse<?> getClassById(int classId);
}
