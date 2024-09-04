package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class ScheduleDTO
{

    public ScheduleDTO(Integer id, Integer subjectId, String time, Date startTime, Date endTime, Integer classId, String classRoom, Integer staffId) {
        Id = id;
        this.subjectId = subjectId;
        this.time = time;
        this.startTime = startTime;
        this.endTime = endTime;
        this.classId = classId;
        this.classRoom = classRoom;
        StaffId = staffId;
    }

    @JsonProperty("id")
    private Integer Id;

    @JsonProperty("subject_id")
    private Integer subjectId;

    @JsonProperty("time")
    private String time;

    @JsonProperty("start_time")
    private Date startTime;

    @JsonProperty("end_time")
    private Date endTime;

    @JsonProperty("class_id")
    private Integer classId;

    @JsonProperty("classroom")
    private String classRoom;

    @JsonProperty("staff_id")
    private Integer StaffId;
}
