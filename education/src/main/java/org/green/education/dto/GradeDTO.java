package org.green.education.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.green.education.entity.Grade;

@Builder
@Setter
@Getter
@NoArgsConstructor
public class GradeDTO {
    private Integer id;
    private Integer grade;
    private String status;
    private StudentDTO student;
    private ExamScheduleDTO examSchedule;

    public GradeDTO(Integer id, Integer grade, String status, StudentDTO student, ExamScheduleDTO examSchedule) {
        this.id = id;
        this.grade = grade;
        this.status = status;
        this.student = student;
        this.examSchedule = examSchedule;
    }

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
}
