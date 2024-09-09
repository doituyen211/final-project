package org.green.education.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassDTO {
    private String trainingProgramName;
    private String className;
    private int classSize;
    private LocalDate startDate;
    private LocalDate endDate;
}
