package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SubjectDto {

    @JsonProperty("subject_id")
    private Integer subjectId;

    @JsonProperty("subject_name")
    private String subjectName;

    @JsonProperty("training_duration")
    private int trainingDuration;

    @JsonProperty("status")
    private int status;

    @JsonProperty("training_program_id")
    private Integer trainingProgramId;
}
