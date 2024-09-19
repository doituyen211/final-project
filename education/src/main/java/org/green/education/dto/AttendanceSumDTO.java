package org.green.education.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttendanceSumDTO {
    private String fullName;
    private String subjectName;
    private int subjectId;
    private Long totalClasses;
    private Long totalPresent;
    private Long totalAbsent;
    private Long totalLate;
    private Long totalOnLeave;
}
