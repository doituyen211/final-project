package org.green.education.service;

import org.green.education.dto.ClassDTO;
import org.green.education.dto.ClassMemberDTO;
import org.green.education.entity.Class;
import org.green.education.form.ClassForm;

import java.util.List;


public interface IClassService {
    List<ClassDTO> getClassList();

    List<ClassMemberDTO> getStudentByClassId(int classId);

    ClassForm createClass(ClassForm classForm);

    ClassForm editClass(int classId, ClassForm classForm);

    Class getClassById(int classId);
}
