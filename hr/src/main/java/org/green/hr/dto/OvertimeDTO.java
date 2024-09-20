package org.green.hr.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import jakarta.validation.constraints.NotNull;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OvertimeDTO {

  Long overTimeId;
  @JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy")
  Date overtimeDate;
  @NotNull(message = "HOURS_NULL")
  Float hours;
  @NotNull(message = "MULTIPLIER_NULL")
  Float multiplier;
  @NotNull(message = "STATUS_NULL")
  Short status;
  @JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy")
  Date createAt;
  @JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy")
  Date updateAt;
  @NotNull(message = "EMPLOYEE_NOT_FOUND")
  Long employeeId;
}
