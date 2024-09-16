package org.green.education.form;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import lombok.Data;
//import org.green.education.validation.StudentIdExist;
//import org.green.education.validation.SubjectIdExist;

import java.util.Date;

@Data
public class LeaveOfAbsenceCreateForm {

    @NotNull(message = "Student Id is required")
    @Positive(message = "Student Id must be positive")
    private Integer studentId;

    @NotNull(message = "Start Time is required")
    private Date startTime;

    @NotNull(message = "End Time is required")
    private Date endTime;

    @NotNull(message = "Status is required")
    @Min(value = 0, message = "Status must be either 0 or 1")
    @Max(value = 1, message = "Status must be either 0 or 1")
    private Integer status;

    @NotNull(message = "Subject Id is required")
    @Positive(message = "Subject Id must be positive")
    private Integer subjectId;
}
