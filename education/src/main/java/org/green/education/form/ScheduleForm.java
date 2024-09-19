package org.green.education.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleForm {

    @JsonProperty("subject_id")
    private Integer subjectId;

    @JsonProperty("time")
    private String time;

    @JsonProperty("start_time")
    private LocalDate startTime;

    @JsonProperty("end_time")
    private LocalDate endTime;

    @JsonProperty("class_id")
    private Integer classId;

    @JsonProperty("classroom")
    private String classRoom;

    @JsonProperty("staff_id")
    private Integer StaffId;
}
