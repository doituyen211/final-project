package org.green.hr.converter;

import org.green.hr.dto.EmployeeDTO;
import org.green.hr.entity.Contract;
import org.green.hr.entity.Employee;
import org.green.hr.entity.Qualification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeConverter {

    @Autowired
    private ModelMapper modelMapper;

    public EmployeeDTO convertToDto(Employee employee) {

        EmployeeDTO employeeDTO = EmployeeDTO.builder()
                .id(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .employeeName(employee.getEmployeeName())
                .dateOfBirth(employee.getDateOfBirth())
                .gender(employee.getGender())
                .citizenId(employee.getCitizenId())
                .address(employee.getAddress())
                .email(employee.getEmail())
                .password(employee.getPassword())
                .phoneNumber(employee.getPhoneNumber())
                .image(employee.getImage())
                .status(employee.getStatus())
                .createdAt(employee.getCreateAt())
                .updatedAt(employee.getUpdateAt())
                .build();

        employeeDTO.setPosition(employee.getPosition().getPositionName());
        employeeDTO.setDepartment(employee.getDepartment().getDepartmentName());

        List<String> contractNames = new ArrayList<>();

        for (Contract contract : employee.getContracts()) {
            contractNames.add(contract.getContractCategory());
        }

        List<String> qualificationNames = new ArrayList<>();

        for (Qualification qualification : employee.getQualifications()) {
            qualificationNames.add(qualification.getQualificationName());
        }

        employeeDTO.setContractCategory(contractNames);
        employeeDTO.setQualificationName(qualificationNames);

        return employeeDTO;
    }
}
