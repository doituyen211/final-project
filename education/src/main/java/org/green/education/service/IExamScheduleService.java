package org.green.education.service;

import org.green.education.dto.ExamScheduleDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Subject;
import org.green.education.response.ExamScheduleListResponse;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IExamScheduleService {

    List<ExamScheduleDTO> getExamSchedule();
    List<ExamScheduleDTO> findAllExamSchedule();
    ExamScheduleDTO findExamScheduleById(Integer id);
    ExamScheduleDTO addExamSchedule(ExamScheduleDTO examScheduleDTO);
    ExamScheduleDTO updateExamSchedule(ExamScheduleDTO examScheduleDTO);
    ExamScheduleDTO deleteExamSchedule(ExamScheduleDTO examScheduleDTO);
    List<SubjectDto> getSubjectsByClassId(Integer classId);
    ExamScheduleListResponse getExamSchedulePaged(int page, int size);
}
