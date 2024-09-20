package org.green.hr.converter;

import org.green.hr.dto.SalaryDTO;
import org.green.hr.entity.Salary;
import org.green.hr.model.response.SalaryRespons;
import org.green.hr.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SalaryConverter {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Salary convertToEntity(SalaryDTO salaryDTO) {
        Salary salary = new Salary();

        if (salaryDTO.getId() != null) salary.setId(salaryDTO.getId());
        salary.setSalary(salaryDTO.getSalary());;
        salary.setStatus(salaryDTO.getStatus());
        salary.setCreateAt(salaryDTO.getCreateAt());
        salary.setUpdateAt(salaryDTO.getUpdateAt());

        if (salaryDTO.getEmployeeCode() != null) {
            salary.setEmployee(employeeRepository.findEmployeeByCode(salaryDTO.getEmployeeCode()));
        }

        return salary;
    }

    public SalaryRespons convertToResponse(Salary salary) {
        SalaryRespons salaryResponse = new SalaryRespons();

        salaryResponse.setSalary(salary.getSalary());
        salaryResponse.setStatus(salary.getStatus());
        salaryResponse.setCreateAt(salary.getCreateAt());
        salaryResponse.setUpdateAt(salary.getUpdateAt());
        if (salary.getEmployee() != null) {
            salaryResponse.setEmployeeCode(salary.getEmployee().getEmployeeCode());
        }

        return salaryResponse;
    }

    public SalaryDTO convertToDTO(Salary salary) {
        SalaryDTO salaryDTO = new SalaryDTO();

        salaryDTO.setId(salary.getId());
        salaryDTO.setSalary(salary.getSalary());
        salaryDTO.setStatus(salary.getStatus());
        salaryDTO.setCreateAt(salary.getCreateAt());
        salaryDTO.setUpdateAt(salary.getUpdateAt());
        if (salary.getEmployee() != null) {
            salaryDTO.setEmployeeCode(salary.getEmployee().getEmployeeCode());
        }

        return salaryDTO;
    }

    public Salary updateEntityFromDTO(SalaryDTO salaryDTO, Salary existingSalary) {
        existingSalary.setSalary(salaryDTO.getSalary());
        existingSalary.setStatus(salaryDTO.getStatus());
        existingSalary.setCreateAt(salaryDTO.getCreateAt());
        existingSalary.setUpdateAt(salaryDTO.getUpdateAt());

        if (salaryDTO.getEmployeeCode() != null) {
            existingSalary.setEmployee(employeeRepository.findEmployeeByCode(salaryDTO.getEmployeeCode()));
        }

        return existingSalary;
    }
}
