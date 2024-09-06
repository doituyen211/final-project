package org.green.education.dto;

import lombok.*;
import org.green.education.entity.Reserved;

import java.util.Date;

@Data
public class ReservedDTO {

    private int id;

    private int studentId;

    private Date startTime;

    private Date endTime;

    private int status;

    private int subjectId;

    public ReservedDTO(int id, int studentId, Date startTime, Date endTime, int status, int subjectId) {
        this.id = id;
        this.studentId = studentId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.subjectId = subjectId;
    }

    public ReservedDTO(Reserved reserved) {
        this.id = reserved.getId();
        this.startTime = reserved.getStartTime();
        this.endTime = reserved.getEndTime();
        this.studentId = reserved.getStudent().getId();
        this.subjectId=reserved.getSubject().getSubjectId();
        this.status=reserved.getStatus();
//        if (reserved.getStudent() != null) {
//            this.studentId = new StudentDTO(reserved.getStudent());
//        }
//        if (reserved.getSubject() != null) {
//            this.subjectId = new SubjectDto(reserved.getSubject());
//        }
    }
}
