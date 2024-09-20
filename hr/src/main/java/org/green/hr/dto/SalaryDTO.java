package org.green.hr.dto;

import lombok.Data;

import java.util.Date;

@Data
public class SalaryDTO {
    private Long id;
    private float salary;
    private Short status;
    private Date createAt;
    private Date updateAt;

    private String employeeCode;
}
