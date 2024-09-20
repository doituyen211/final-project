package org.green.hr.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
public class WorkProcessDTO {
  Long workProcessId;
  Integer timeOff;
  @JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy")
  Date workDate;
  @NotNull(message = "STATUS_NULL")
  @Min(value = 0, message = "STATUS_MIN_0")
  @Max(value = 1, message = "STATUS_MAX_1")
  Short status;
  @JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy")
  Date createAt;
  @JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy")
  Date updateAt;
  @NotNull(message = "EMPLOYEE_NOT_FOUND")
  Long employeeId;
  @NotNull(message = "REWARD_DISCIPLINE_NOT_FOUND")
  Long rewardDisciplineId;
}
