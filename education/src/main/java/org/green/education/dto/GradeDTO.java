package org.green.education.dto;

import lombok.*;
import org.green.education.entity.Grade;

import java.time.LocalDate;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GradeDTO {
    private Integer id;
    private Integer grade;
    private String status;
    private String studenName;
    private String subjectName;
    private LocalDate examDate;
    private String programName;
    private String courseName;
}
