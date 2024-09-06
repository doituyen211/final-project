package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
