package org.green.education.form;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
//import org.green.education.validation.StudentIdExists;
//import org.green.education.validation.SubjectIdExists;

import java.util.Date;

@Data
public class LeaveOfAbsenceCreateForm {

    @NotNull(message = "Student Id is not Blank")
    @Positive(message = "Student Id must be positive")
//    @StudentIdExists(message = "Student Id does not exist")
    private Integer studentId;

    @NotNull(message = "Start Time is not Blank")
    private Date startTime;

    @NotNull(message = "End Time is not Blank")
    private Date endTime;

    @NotNull(message = "Status is not Blank")
    @Positive(message = "Status must be positive")
    private Integer status;

    @NotNull(message = "Subject Id is not Blank")
    @Positive(message = "Subject Id must be positive")
//    @SubjectIdExists(message = "Subject Id does not exist")
    private Integer subjectId;
}
