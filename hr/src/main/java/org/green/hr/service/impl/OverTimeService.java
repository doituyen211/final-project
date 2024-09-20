package org.green.hr.service.impl;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.green.hr.converter.OvertimeConverter;
import org.green.hr.dto.OvertimeDTO;
import org.green.hr.entity.Employee;
import org.green.hr.entity.Overtime;
import org.green.hr.exception.AppException;
import org.green.hr.exception.ErrorCode;
import org.green.hr.repository.EmployeeRepository;
import org.green.hr.repository.OverTimeRepository;
import org.green.hr.service.IOverTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OverTimeService implements IOverTimeService {

  @Autowired
  OverTimeRepository overTimeRepository;

  @Autowired
  EmployeeRepository employeeRepository;

  @Override
  public OvertimeDTO addOverTime(OvertimeDTO overtimeDTO) {
    Employee employee = employeeRepository.findById(overtimeDTO.getEmployeeId())
        .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));
    Overtime overtime = OvertimeConverter.convertToEntity(overtimeDTO);
    overtime.setEmployee(employee);
    Overtime saveOvertime = overTimeRepository.save(overtime);
    return OvertimeConverter.convertToDTO(saveOvertime);

  }

  @Override
  public OvertimeDTO updateOvertime(long overtimeId, OvertimeDTO overtimeDTO) {
    Overtime overtime = overTimeRepository.findById(overtimeId)
        .orElseThrow(() -> new AppException(ErrorCode.OVERTIME_NOT_FOUND));
    overtime.setHours(overtimeDTO.getHours());
    overtime.setMultiplier(overtimeDTO.getMultiplier());
    overtime.setStatus(overtimeDTO.getStatus());
    overtime.setUpdateAt(new Date());
    overTimeRepository.save(overtime);
    return OvertimeConverter.convertToDTO(overtime);
  }

  @Override
  public OvertimeDTO deleteOvertime(long overtimeId) {
    Overtime overtime = overTimeRepository.findById(overtimeId)
        .orElseThrow(() -> new AppException(ErrorCode.OVERTIME_NOT_FOUND));
    overTimeRepository.delete(overtime);
    return OvertimeConverter.convertToDTO(overtime);
  }

  @Override
  public List<OvertimeDTO> getAllOvertimes() {
    List<Overtime> overtimeList = overTimeRepository.findAll();
    overtimeList.sort(Comparator.comparingLong(Overtime::getId).reversed());
    return overtimeList.stream().map(OvertimeConverter::convertToDTO).collect(Collectors.toList());
  }

  @Override
  public List<OvertimeDTO> getOvertimeById(long overtimeId) {
    Overtime overtime = overTimeRepository.findById(overtimeId)
        .orElseThrow(() -> new AppException(ErrorCode.OVERTIME_NOT_FOUND));
    return List.of(OvertimeConverter.convertToDTO(overtime));
  }
}
