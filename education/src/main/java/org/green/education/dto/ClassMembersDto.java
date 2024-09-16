package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data

public class ClassMembersDto {

    @JsonProperty("id")
    private Integer Id;

    @JsonProperty("student_id")
    private Integer studentId;

    @JsonProperty("class_id")
    private Integer classId;

    @JsonProperty("status")
    private String status;

}
