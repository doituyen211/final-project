package org.green.education.service;

import org.green.education.dto.ExamScheduleDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Subject;

import java.util.List;

public interface IExamScheduleService {
    List<ExamScheduleDTO> getExamSchedule();
    ExamScheduleDTO findExamScheduleById(Integer id);
    ExamScheduleDTO addExamSchedule(ExamScheduleDTO examScheduleDTO);
    ExamScheduleDTO updateExamSchedule(ExamScheduleDTO examScheduleDTO);
    ExamScheduleDTO deleteExamSchedule(ExamScheduleDTO examScheduleDTO);
    List<SubjectDto> getSubjectsByClassId(Integer classId);
}
