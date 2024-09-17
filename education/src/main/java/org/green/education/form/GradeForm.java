package org.green.education.form;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradeForm {
    private Integer grade;
    private Integer grade2;
    private Integer grade3;
    private String status;
    private Integer studentId;
    private Integer subjectId;
    private Integer trainingProgramId;
    private Integer examScheduleId;

}
