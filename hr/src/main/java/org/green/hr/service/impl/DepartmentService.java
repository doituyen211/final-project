package org.green.hr.service.impl;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.green.hr.converter.DepartmentConverter;
import org.green.hr.dto.DepartmentDTO;
import org.green.hr.entity.Department;
import org.green.hr.exception.AppException;
import org.green.hr.exception.ErrorCode;
import org.green.hr.repository.DepartmentRepository;
import org.green.hr.repository.PositionRepository;
import org.green.hr.service.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService implements IDepartmentService {

  @Autowired
  DepartmentRepository departmentRepository;

  @Autowired
  PositionRepository positionRepository;


  @Override
  public DepartmentDTO addDepartment(DepartmentDTO departmentDTO) {
    if (departmentRepository.findByDepartmentName(departmentDTO.getDepartmentName())
        != null) {
      throw new AppException(ErrorCode.DEPARTMENT_EXIST);
    }
    Department department = DepartmentConverter.convertToEntity(departmentDTO);
    Department saveDepartment = departmentRepository.save(department);
    return DepartmentConverter.convertToDTO(saveDepartment);
  }

  @Override
  public DepartmentDTO updateDepartment(long departmentId, DepartmentDTO departmentDTO) {
    Department department = departmentRepository.findById(departmentId)
        .orElseThrow(() -> new AppException(ErrorCode.DEPARTMENT_NOT_FOUND));
    department.setDescription(departmentDTO.getDescription());
    department.setStatus(departmentDTO.getStatus());
    department.setUpdateAt(new Date());
    departmentRepository.save(department);
    return DepartmentConverter.convertToDTO(department);
  }

  @Override
  public DepartmentDTO deleteDepartment(long departmentId) {
    Department department = departmentRepository.findById(departmentId)
        .orElseThrow(() -> new AppException(ErrorCode.DEPARTMENT_NOT_FOUND));
    if (!department.getPositions().isEmpty()) {
      throw new AppException(ErrorCode.DEPARTMENT_HAS_POSITIONS);
    }
    departmentRepository.delete(department);
    return DepartmentConverter.convertToDTO(department);
  }

  @Override
  public List<DepartmentDTO> getAllDepartment() {
    List<Department> departmentList = departmentRepository.findAll();
    departmentList.sort(Comparator.comparingLong(Department::getId).reversed());
    return departmentList.stream().map(DepartmentConverter::convertToDTO)
        .collect(Collectors.toList());
  }

  @Override
  public List<DepartmentDTO> getDepartmentById(long departmentId) {
    Optional<Department> department = departmentRepository.findById(departmentId);
    if (department.isPresent()) {
      return List.of(DepartmentConverter.convertToDTO(department.get()));
    } else {
      throw new AppException(ErrorCode.DEPARTMENT_NOT_FOUND);
    }
  }
}

