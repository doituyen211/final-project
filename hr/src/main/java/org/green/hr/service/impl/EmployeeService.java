package org.green.hr.service.impl;

import jakarta.transaction.Transactional;
import org.green.hr.converter.EmployeeConverter;
import org.green.hr.dto.EmployeeDTO;
import org.green.hr.entity.Employee;
import org.green.hr.repository.EmployeeRepository;
import org.green.hr.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeConverter employeeConverter;

    @Transactional
    @Override
    public Employee createEmployee(Employee employee) {
        return this.employeeRepository.save(employee);
    }

    @Override
    public Page<EmployeeDTO> getEmployees(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Page<Employee> employees = employeeRepository.findAll(pageable);

        return employees.map(employee -> employeeConverter.convertToDto(employee));
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id).orElse(null);

        if (employee == null) {
            return null;
        }

        return employeeConverter.convertToDto(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

        List<EmployeeDTO> employeesList = new ArrayList<>();

        for (Employee employee : employees) {
            employeesList.add(employeeConverter.convertToDto(employee));
        }

        return employeesList;
    }
}
