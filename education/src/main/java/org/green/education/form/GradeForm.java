package org.green.education.form;

import lombok.*;

import java.time.LocalDate;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradeForm {
    private Integer grade;
    private String status;
    private Integer studentId;
    private Integer subjectId;
    private Integer examScheduleId;
//    private String programName;
//    private String courseName;
}
