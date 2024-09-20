package org.green.education.form;

import jakarta.validation.constraints.*;
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

    @NotBlank(message = "Tên lớp học không được để trống")
    @Size(max = 100, message = "Tên lớp học không được vượt quá 100 ký tự")
    private String className;

//    @Min(value = 1, message = "Kích thước lớp phải là số dương")
//    private int classSize;

    @NotNull(message = "Ngày bắt đầu không được để trống")
    private LocalDate startDate;

    @NotNull(message = "Ngày kết thúc không được để trống")
    @FutureOrPresent(message = "Ngày kết thúc phải ở hiện tại hoặc tương lai")
    private LocalDate endDate;

    @AssertTrue(message = "Ngày kết thúc phải sau ngày bắt đầu")
    private boolean isEndDateAfterStartDate() {
        if (startDate == null || endDate == null) {
            return true; // Nếu một trong hai giá trị là null, không xác thực điều kiện này.
        }
        return endDate.isAfter(startDate) || endDate.isEqual(startDate);
    }
}

