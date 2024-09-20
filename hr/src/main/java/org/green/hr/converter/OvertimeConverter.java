package org.green.hr.converter;

import java.util.Date;
import org.green.hr.dto.OvertimeDTO;
import org.green.hr.entity.Overtime;

public class OvertimeConverter {

  public static Overtime convertToEntity(OvertimeDTO overtimeDTO) {
    return Overtime.builder()
        .id(overtimeDTO.getOverTimeId())
        .overtimeDate(new Date())
        .hours(overtimeDTO.getHours())
        .multiplier(overtimeDTO.getMultiplier())
        .status(overtimeDTO.getStatus())
        .createAt(overtimeDTO.getCreateAt() != null ? overtimeDTO.getCreateAt() : new Date())
        .updateAt(new Date())
        .build();
  }

  public static OvertimeDTO convertToDTO(Overtime overtime) {
    return OvertimeDTO.builder()
        .overTimeId(overtime.getId())
        .overtimeDate(overtime.getOvertimeDate())
        .hours(overtime.getHours())
        .multiplier(overtime.getMultiplier())
        .status(overtime.getStatus())
        .createAt(overtime.getCreateAt())
        .updateAt(overtime.getUpdateAt())
        .employeeId(overtime.getEmployee().getId())
        .build();
  }
}
