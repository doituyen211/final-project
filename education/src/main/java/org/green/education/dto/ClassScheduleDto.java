package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassScheduleDto
{
    @JsonProperty("id")
    private Integer Id;

    @JsonProperty("subject_name")
    private String subjectName;

    @JsonProperty("time")
    private String time;

    @JsonProperty("start_time")
    private LocalDate startTime;

    @JsonProperty("end_time")
    private LocalDate endTime;

    @JsonProperty("class_name")
    private String className;

    @JsonProperty("classroom")
    private String classRoom;

    @JsonProperty("staff_id")
    private Integer StaffId;

    @JsonProperty("status")
    private Boolean status;

}
