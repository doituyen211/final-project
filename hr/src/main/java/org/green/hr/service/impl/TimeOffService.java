package org.green.hr.service.impl;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import org.green.hr.converter.TimeOffConverter;
import org.green.hr.dto.TimeOffDTO;
import org.green.hr.entity.Employee;
import org.green.hr.entity.TimeOff;
import org.green.hr.exception.AppException;
import org.green.hr.exception.ErrorCode;
import org.green.hr.repository.EmployeeRepository;
import org.green.hr.repository.TimeOffRepository;
import org.green.hr.service.ITimeOffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TimeOffService implements ITimeOffService {

  @Autowired
  TimeOffRepository timeOffRepository;
  @Autowired
  EmployeeRepository employeeRepository;

  @Override
  public TimeOffDTO addTimeOff(TimeOffDTO timeOffDTO) {
    Employee employee = employeeRepository.findById(timeOffDTO.getEmployeeId())
        .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));
    TimeOff timeOff = TimeOffConverter.convertToEntity(timeOffDTO);
    timeOff.setEmployee(employee);
    TimeOff saveTimeOff = timeOffRepository.save(timeOff);
    return TimeOffConverter.convertToDTO(saveTimeOff);
  }

  @Override
  public TimeOffDTO updateTimeOff(long timeOffId, TimeOffDTO timeOffDTO) {
    TimeOff timeOff = timeOffRepository.findById(timeOffId)
        .orElseThrow(() -> new AppException(ErrorCode.TIME_OFF_NOT_FOUND));
    timeOff.setDateStart(timeOffDTO.getDateStart());
    timeOff.setDateEnd(timeOffDTO.getDateEnd());
    long diffInMillies = Math.abs(timeOffDTO.getDateEnd().getTime() - timeOffDTO.getDateStart().getTime());
    int dayNumber = (int) TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
    timeOff.setDayNumber(dayNumber);

    timeOff.setStatus(timeOffDTO.getStatus());
    timeOff.setUpdateAt(new Date());
    TimeOff updatedTimeOff = timeOffRepository.save(timeOff);
    return TimeOffConverter.convertToDTO(timeOff);
  }

  @Override
  public TimeOffDTO deleteTimeOff(long timeOffId) {
    TimeOff timeOff = timeOffRepository.findById(timeOffId)
        .orElseThrow(() -> new AppException(ErrorCode.TIME_OFF_NOT_FOUND));
    timeOffRepository.delete(timeOff);
    return TimeOffConverter.convertToDTO(timeOff);
  }

  @Override
  public List<TimeOffDTO> getTimeOff() {
    List<TimeOff> timeOffList = timeOffRepository.findAll();
    timeOffList.sort(Comparator.comparingLong(TimeOff::getId).reversed());
    return timeOffList.stream().map(TimeOffConverter::convertToDTO).collect(Collectors.toList());
  }

  @Override
  public List<TimeOffDTO> getTimeOffById(long timeOffId) {
    TimeOff timeOff = timeOffRepository.findById(timeOffId)
        .orElseThrow(() -> new AppException(ErrorCode.TIME_OFF_NOT_FOUND));
    return List.of(TimeOffConverter.convertToDTO(timeOff));
  }

}
