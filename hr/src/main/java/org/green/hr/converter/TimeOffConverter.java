package org.green.hr.converter;

import java.util.Date;
import java.util.concurrent.TimeUnit;
import org.green.hr.dto.TimeOffDTO;
import org.green.hr.entity.TimeOff;
import org.green.hr.exception.AppException;
import org.green.hr.exception.ErrorCode;

public class TimeOffConverter {

  public static TimeOff convertToEntity(TimeOffDTO timeOffDTO) {

    long diffInMillies = Math.abs(
        timeOffDTO.getDateEnd().getTime() - timeOffDTO.getDateStart().getTime());
    int dayNumber = (int) TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
    Short status = (short) (new Date().after(timeOffDTO.getDateEnd()) ? 0 : 1);
    return TimeOff.builder()
        .id(timeOffDTO.getTimeOffId())
        .dateStart(timeOffDTO.getDateStart())
        .dateEnd(timeOffDTO.getDateEnd())
        .dayNumber(dayNumber)
        .status(status)
        .createAt(new Date())
        .updateAt(new Date())
        .build();
  }

  public static TimeOffDTO convertToDTO(TimeOff timeOff) {
    return TimeOffDTO.builder()
        .timeOffId(timeOff.getId())
        .dateStart(timeOff.getDateStart())
        .dateEnd(timeOff.getDateEnd())
        .dayNumber(timeOff.getDayNumber())
        .status(timeOff.getStatus())
        .createAt(timeOff.getCreateAt())
        .updateAt(new Date())
        .employeeId(timeOff.getEmployee().getId())
        .build();
  }
}
