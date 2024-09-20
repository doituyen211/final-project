package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
