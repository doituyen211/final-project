package org.green.education.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Builder
@Setter
@Getter
@NoArgsConstructor
public class GradeDTO {
    private String full_name;
    private Integer grade;
    private LocalDate exam_date;
    private String subject_name;
    private String program_name;
    private String course_name;
    private String status;

    public GradeDTO(String full_name, Integer grade, LocalDate exam_date,
                    String subject_name, String program_name, String course_name, String status) {
        this.full_name = full_name;
        this.grade = grade;
        this.exam_date = exam_date;
        this.subject_name = subject_name;
        this.program_name = program_name;
        this.course_name = course_name;
        this.status = status;
    }

}
