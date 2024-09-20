package org.green.hr.service.impl;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import lombok.NonNull;
import org.green.hr.converter.SalaryAdvanceConverter;
import org.green.hr.dto.SalaryAdvanceDTO;
import org.green.hr.entity.Employee;
import org.green.hr.entity.SalaryAdvance;
import org.green.hr.exception.AppException;
import org.green.hr.exception.ErrorCode;
import org.green.hr.repository.EmployeeRepository;
import org.green.hr.repository.SalaryAdvanceRepository;
import org.green.hr.service.ISalaryAdvanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SalaryAdvanceService implements ISalaryAdvanceService {

  @Autowired
  SalaryAdvanceRepository salaryAdvanceRepository;
  @Autowired
  EmployeeRepository employeeRepository;

  @Override
  public SalaryAdvanceDTO addSalaryAdvance(SalaryAdvanceDTO salaryAdvanceDTO) {
    Employee employee = employeeRepository.findById(salaryAdvanceDTO.getEmployeeId())
        .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));
    SalaryAdvance salaryAdvance = SalaryAdvanceConverter.convertToEntity(salaryAdvanceDTO);
    salaryAdvance.setEmployee(employee);
    SalaryAdvance saveSalaryAdvance = salaryAdvanceRepository.save(salaryAdvance);
    return SalaryAdvanceConverter.convertToDTO(saveSalaryAdvance);
  }

  @Override
  public SalaryAdvanceDTO updateSalaryAdvance(long salaryAdvanceId,
      SalaryAdvanceDTO salaryAdvanceDTO) {
    SalaryAdvance salaryAdvance = salaryAdvanceRepository.findById(salaryAdvanceId)
        .orElseThrow(() -> new AppException(ErrorCode.SALARY_ADVANCE_NOT_FOUND));
    salaryAdvance.setMoney(salaryAdvanceDTO.getMoney());
    salaryAdvance.setStatus(salaryAdvanceDTO.getStatus());
    salaryAdvance.setUpdateAt(new Date());
    salaryAdvanceRepository.save(salaryAdvance);
    return SalaryAdvanceConverter.convertToDTO(salaryAdvance);
  }

  @Override
  public SalaryAdvanceDTO deleteSalaryAdvance(long salaryAdvanceId) {
    SalaryAdvance salaryAdvance = salaryAdvanceRepository.findById(salaryAdvanceId)
        .orElseThrow(() -> new AppException(ErrorCode.SALARY_ADVANCE_NOT_FOUND));
    salaryAdvanceRepository.delete(salaryAdvance);
    return SalaryAdvanceConverter.convertToDTO(salaryAdvance);
  }

  @Override
  public List<SalaryAdvanceDTO> getSalaryAdvances() {
    List<SalaryAdvance> salaryAdvanceList = salaryAdvanceRepository.findAll();
    salaryAdvanceList.sort(Comparator.comparingLong(SalaryAdvance::getId).reversed());
    return salaryAdvanceList.stream().map(SalaryAdvanceConverter::convertToDTO)
        .collect(Collectors.toList());
  }

  @Override
  public Page<SalaryAdvanceDTO> getAllSalaryAdvances(@NonNull Pageable pageable) {
    return salaryAdvanceRepository.findAll(pageable).map(SalaryAdvanceConverter::convertToDTO);
  }

  @Override
  public List<SalaryAdvanceDTO> getSalaryAdvanceById(long salaryAdvanceId) {
    SalaryAdvance salaryAdvance = salaryAdvanceRepository.findById(salaryAdvanceId)
        .orElseThrow(() -> new AppException(ErrorCode.SALARY_ADVANCE_NOT_FOUND));
    return List.of(SalaryAdvanceConverter.convertToDTO(salaryAdvance));
  }
}
