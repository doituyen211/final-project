package org.green.hr.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class EmployeeDTO {

    private Long id;
    private String employeeCode;
    private String employeeName;
    private Date dateOfBirth;
    private Short gender;
    private String citizenId;
    private String address;
    private String email;
    private String password;
    private String phoneNumber;
    private String image;
    private Short status;
    private Date createdAt;
    private Date updatedAt;
    private String position;
    private String department;
    private List<String> contractCategory;
    private List<String> qualificationName;
}
