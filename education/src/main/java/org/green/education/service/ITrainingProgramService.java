package org.green.education.service;

import org.green.education.dto.ProgramDTO;
import org.green.education.entity.TrainingProgram;

import java.util.List;

public interface ITrainingProgramService {
    List<ProgramDTO> getAllTrainingPrograms();
}
