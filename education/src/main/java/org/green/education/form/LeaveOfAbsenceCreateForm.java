package org.green.education.form;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.util.Date;

@Data
public class LeaveOfAbsenceCreateForm {

    @NotNull(message = "Student Id is required")
    @Positive(message = "Student Id must be positive")
    private Integer studentId;

    @NotNull(message = "Start Time is required")
    private Date startDate;

    @NotNull(message = "End Time is required")
    private Date endDate;

    @NotNull(message = "Subject Id is required")
    @Positive(message = "Subject Id must be positive")
    private Integer subjectId;
}
