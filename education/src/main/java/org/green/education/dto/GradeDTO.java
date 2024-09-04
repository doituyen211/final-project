package org.green.education.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.green.education.entity.Grade;

import java.util.Date;

@Builder
@Setter
@Getter
@NoArgsConstructor
public class GradeDTO {
//    private String full_name;
    private Integer grade;
    private Integer id;
//    private Date exam_date;
//    private String subject_name;
//    private String program_name;
//    private String course_name;
    private String status;
    private StudentDTO student;
    private ExamScheduleDTO examSchedule;

    public GradeDTO(Grade grade) {
        this.id = grade.getId();
        this.grade = grade.getGrade();
        this.status = grade.getStatus();
        if (grade.getStudent() != null) {
            this.student = new StudentDTO(grade.getStudent());
        }
        if (grade.getExamSchedule() != null) {
            this.examSchedule = new ExamScheduleDTO(grade.getExamSchedule());
        }
    }


    public boolean isPresent() {
        return grade != null;
    }
}
