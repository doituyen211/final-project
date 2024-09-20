package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data

public class CourseDto {

    @JsonProperty("course_id")
    private Integer Id;

    @JsonProperty("course_name")
    private String courseName;


}
