package org.green.hr.converter;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import org.green.hr.dto.DepartmentDTO;
import org.green.hr.entity.Department;

public class DepartmentConverter {

  //Tu entity sang DTO
  public static Department convertToEntity(DepartmentDTO departmentDTO) {
    return Department.builder()
        .id(departmentDTO.getDepartmentId())
        .departmentName(departmentDTO.getDepartmentName())
        .description(departmentDTO.getDescription())
        .status(departmentDTO.getStatus())
        .createAt(departmentDTO.getCreateAt() != null ? departmentDTO.getCreateAt() : new Date())
        .updateAt(new Date())
        .build();
  }

  //Tu DTO sang entity
  public static DepartmentDTO convertToDTO(Department department) {
    return DepartmentDTO.builder()
        .departmentId(department.getId())
        .departmentName(department.getDepartmentName())
        .description(department.getDescription())
        .status(department.getStatus())
        .createAt(department.getCreateAt())
        .updateAt(department.getUpdateAt())
        .build();
  }

}
