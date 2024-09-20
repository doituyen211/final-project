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
    private String studentName;
    private Integer grade;
    private LocalDate examDate;
    private String subjectName;
    private String programName;
    private String courseName;
    private String status;
}
