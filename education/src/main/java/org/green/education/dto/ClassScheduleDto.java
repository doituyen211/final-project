package org.green.education.dto;

import lombok.Value;

import java.io.Serializable;
import java.util.Date;

@Value
public class ClassScheduleDto implements Serializable {
    Integer id;
    Integer subjectId;
    String time;
    Date startTime;
    Date endTime;
    Integer classId;
    String classroom;
    Integer staffId;
}