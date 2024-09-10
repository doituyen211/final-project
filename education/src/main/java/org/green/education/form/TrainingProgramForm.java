package org.green.education.form;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingProgramForm {
    @Valid
    @NotNull(message = "Program name is required")
    @NotBlank(message = "Program name is required")
    @Size(min = 3, max = 200, message = "Program Name must be between 3 and 200 characters")
    private String programName;

    private int courseId;

    @Min(value = 0, message = "Price must be greater than or equal to 0")
    @Max(value = 10000000, message = "Price must be less than or equal to 10,000,000")
    private int tuitionFee;

    private boolean status;

    @Min(value = 1, message = "Training duration must be greater than 0")
    private int trainingDuration;
}

