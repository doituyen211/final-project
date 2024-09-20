package org.green.education.dto;


import lombok.*;
import org.green.education.entity.Class;
import org.green.education.entity.ExamSchedule;
import org.green.education.entity.Subject;


import java.time.LocalDate;
import java.util.Date;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExamScheduleDTO {
    private Integer id;
    private String subject;
    private String classField;
    private LocalDate examDate;
    private String examLink;
    private Boolean status;

}