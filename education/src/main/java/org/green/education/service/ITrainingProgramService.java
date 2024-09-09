package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.ClassDTO;
import org.green.education.dto.ProgramDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.TrainingProgram;

import org.green.education.response.TrainingProgramListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ITrainingProgramService {
    CoreResponse<?> getAllTrainingPrograms(int page, int limit);

    CoreResponse<?> getClassesByTrainingProgramId(int trainingProgramId, int page, int limit);

    CoreResponse<?> getSubjectsByTrainingProgramId(int trainingProgramId, int page, int limit);

}
