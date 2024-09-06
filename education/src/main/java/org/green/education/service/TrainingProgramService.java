package org.green.education.service;

import lombok.RequiredArgsConstructor;
import org.green.education.dto.ProgramDTO;
import org.green.education.entity.TrainingProgram;
import org.green.education.repository.ITrainingProgramRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingProgramService implements ITrainingProgramService {
    private final ITrainingProgramRepository trainingProgramRepository;

    @Override
    public List<ProgramDTO> getAllTrainingPrograms() {
        List<ProgramDTO> programs = new ArrayList<>();
        List<TrainingProgram> trainingPrograms = trainingProgramRepository.findAll();
        for (TrainingProgram trainingProgram : trainingPrograms) {
            ProgramDTO programDTO = ProgramDTO.builder()
                    .id(trainingProgram.getProgramId())
                    .programName(trainingProgram.getProgramName())
                    .courseName(trainingProgram.getCourse().getCourseName())
                    .tuitionFee(trainingProgram.getTuitionFee())
                    .status(trainingProgram.getStatus())
                    .trainingDuration(trainingProgram.getTrainingDuration())
                    .build();
            programs.add(programDTO);
        }
        return programs;
    }
}
