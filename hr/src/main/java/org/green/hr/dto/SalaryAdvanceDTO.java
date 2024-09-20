package org.green.hr.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SalaryAdvanceDTO {

  Long salaryAdvanceId;
  @JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy")
  Date salaryAdvanceDate;
  @NotNull(message = "MONEY_NOT_NULL")
  Float money;
  @NotNull(message = "STATUS_NULL")
  Short status;
  @JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy")
  Date createAt;
  @JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy")
  Date updateAt;
  @NotNull(message = "EMPLOYEE_NOT_FOUND")
  Long employeeId;
}
