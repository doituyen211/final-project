package org.green.hr.converter;

import java.util.Date;
import org.green.hr.dto.SalaryAdvanceDTO;
import org.green.hr.entity.SalaryAdvance;

public class SalaryAdvanceConverter {

  public static SalaryAdvance convertToEntity(SalaryAdvanceDTO salaryAdvanceDTO) {
    return SalaryAdvance.builder()
        .id(salaryAdvanceDTO.getSalaryAdvanceId())
        .salaryAdvanceDate(new Date())
        .money(salaryAdvanceDTO.getMoney())
        .status(salaryAdvanceDTO.getStatus())
        .createAt(
            salaryAdvanceDTO.getCreateAt() != null ? salaryAdvanceDTO.getCreateAt() : new Date())
        .updateAt(new Date())
        .build();
  }

  public static SalaryAdvanceDTO convertToDTO(SalaryAdvance salaryAdvance) {
    return SalaryAdvanceDTO.builder()
        .salaryAdvanceId(salaryAdvance.getId())
        .salaryAdvanceDate(salaryAdvance.getSalaryAdvanceDate())
        .money(salaryAdvance.getMoney())
        .status(salaryAdvance.getStatus())
        .createAt(salaryAdvance.getCreateAt())
        .updateAt(salaryAdvance.getUpdateAt())
        .employeeId(salaryAdvance.getEmployee().getId())
        .build();
  }
}
