package org.green.hr.service;

import java.util.List;
import org.green.hr.dto.DepartmentDTO;

public interface IDepartmentService {

  DepartmentDTO addDepartment(DepartmentDTO departmentDTO);

  DepartmentDTO updateDepartment(long departmentId, DepartmentDTO departmentDTO);

  DepartmentDTO deleteDepartment(long departmentId);

  List<DepartmentDTO> getAllDepartment();

  List<DepartmentDTO> getDepartmentById(long departmentId);

}
