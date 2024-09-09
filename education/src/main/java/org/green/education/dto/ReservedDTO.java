package org.green.education.dto;

import lombok.*;
import org.green.education.entity.LeaveOfAbsence;

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

    public ReservedDTO(LeaveOfAbsence leaveOfAbsence) {
        this.id = leaveOfAbsence.getId();
        this.startTime = leaveOfAbsence.getStartTime();
        this.endTime = leaveOfAbsence.getEndTime();
        this.studentId = leaveOfAbsence.getStudent().getId();
        this.subjectId= leaveOfAbsence.getSubject().getSubjectId();
        this.status= leaveOfAbsence.getStatus();
//        if (reserved.getStudent() != null) {
//            this.studentId = new StudentDTO(reserved.getStudent());
//        }
//        if (reserved.getSubject() != null) {
//            this.subjectId = new SubjectDto(reserved.getSubject());
//        }
    }
}
