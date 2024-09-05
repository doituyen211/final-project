package org.green.education.dto;

import lombok.*;

import java.util.Date;

@Data
public class ReservedDTO {

    private Integer id;

    private Integer studentId;

    private Date startTime;

    private Date endTime;

    private String status;

    private Integer subjectId;

    public ReservedDTO(Integer id, Integer studentId, Date startTime, Date endTime, String status, Integer subjectId) {
        this.id = id;
        this.studentId = studentId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.subjectId = subjectId;
    }


}
