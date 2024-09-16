package org.green.education.service;

import org.green.core.model.CoreResponse;

public interface IAttendanceService {
    CoreResponse<?> getSumAttendanceByClassIdAndStudentId(int classId, int studentId);
    CoreResponse<?> getAttendanceDetailByClassIdAndStudentIdAndSubjectId(int studentId, int classId, int subjectId);
}
