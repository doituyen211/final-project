package org.green.hr.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDTO {

  Long departmentId;
  @NotBlank(message = "DEPARTMENT_BLANK")
  @Size(max = 50, message = "DEPARTMENT_NAME_INVAILD")
  String departmentName;
  @NotBlank(message = "DESCRIPTION_BLANK")
  @Size(max = 50, message = "DESCRIPTION_INVAILD")
  String description;
  @NotNull(message = "STATUS_NULL")
  Boolean status;
  @JsonFormat(shape = Shape.STRING,pattern = "dd-MM-yyyy")
  Date createAt;
  @JsonFormat(shape = Shape.STRING,pattern = "dd-MM-yyyy")
  Date updateAt;

  List<PositionDTO> positions;
}
