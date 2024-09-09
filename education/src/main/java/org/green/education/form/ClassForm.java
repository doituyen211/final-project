package org.green.education.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClassForm {
    private int programId;
    private String className;
    private int classSize;
    private LocalDate startDate;
    private LocalDate endDate;
}
