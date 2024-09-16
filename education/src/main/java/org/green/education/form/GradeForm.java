package org.green.education.form;

import lombok.*;

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
    private Integer trainingProgramId;
    private Integer examScheduleId;

//    private GradeForm convertGradeToForm(Grade grade) {
//        GradeForm form = new GradeForm();
//        form.setGrade(grade.getGrade());
//        form.setStatus(grade.getStatus());
//        form.setStudentId(grade.getStudent().getId());
//        form.setExamScheduleId(grade.getExamSchedule().getId());
//        return form;
//    }

    // Convert the updated Grade entity to a GradeForm before returning
    //return convertGradeToForm(grade);


}
