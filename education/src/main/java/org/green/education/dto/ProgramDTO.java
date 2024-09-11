package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.green.education.entity.TrainingProgram;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProgramDTO {
    @JsonProperty("program_id")
    private int id;

    @JsonProperty("program_name")
    private String programName;

    @JsonProperty("course_name")
    private String courseName;

    @JsonProperty("tuition_fee")
    private int tuitionFee;

    private boolean status;

    @JsonProperty("training_duration")
    private int trainingDuration;

    public ProgramDTO convertToProgramDTO(TrainingProgram trainingProgram) {
        return ProgramDTO.builder()
                .id(trainingProgram.getProgramId())
                .programName(trainingProgram.getProgramName())
                .courseName(trainingProgram.getCourse().getCourseName())
                .tuitionFee(trainingProgram.getTuitionFee())
                .status(trainingProgram.getStatus())
                .trainingDuration(trainingProgram.getTrainingDuration())
                .build();
    }
}
