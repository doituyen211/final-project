package org.green.hr.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SalaryRespons {
    private float salary;
    private Short status;
    private Date createAt;
    private Date updateAt;
    private String employeeCode;
    private String message;
    public SalaryRespons(String message) {
        this.message = message;
    }
}
