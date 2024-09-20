package org.green.hr.service;

import org.green.hr.dto.EmployeeDTO;
import org.green.hr.entity.Employee;
import org.springframework.data.domain.Page;

import java.util.List;


public interface IEmployeeService {

    Employee createEmployee(Employee employee);

    Page<EmployeeDTO> getEmployees(int pageNo, int pageSize);

    EmployeeDTO getEmployeeById(Long id);

    List<EmployeeDTO> getAllEmployees();
}
