package org.green.education.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.green.education.entity.Class;
import org.green.education.entity.ExamSchedule;
import org.green.education.entity.Subject;


import java.time.LocalDate;
import java.util.Date;

@Builder
@Setter
@Getter
@NoArgsConstructor
public class ExamScheduleDTO {
    Integer id;
    Subject subject;
    Class classField;
    LocalDate examDate;
    String examLink;

    public ExamScheduleDTO(Integer id, Subject subject, Class classField, LocalDate examDate, String examLink) {
        this.id = id;
        this.subject = subject;
        this.classField = classField;
        this.examDate = examDate;
        this.examLink = examLink;
    }
}