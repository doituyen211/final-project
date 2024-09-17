package org.green.education.dto;

import lombok.*;
import java.time.LocalDate;


@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GradeDTO {
    private Integer id;
    private Integer grade;
    private Integer grade2;
    private Integer grade3;
    private String status;
    private Long averageGrade;
    private String studenName;
    private String subjectName;
    private LocalDate examDate;
    private String programName;
    private String courseName;
}
