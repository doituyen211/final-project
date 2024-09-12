package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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
    private Date startTime;

    @JsonProperty("end_time")
    private Date endTime;

    @JsonProperty("class_name")
    private String className;

    @JsonProperty("classroom")
    private String classRoom;

    @JsonProperty("staff_id")
    private Integer StaffId;
}
