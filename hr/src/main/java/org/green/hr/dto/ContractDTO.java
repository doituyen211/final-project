package org.green.hr.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
public class ContractDTO {
    private Long id;
    private String contractCode;
    private String employeeCode;
    private String contractCategory;
    private String contentContractPath;
    private float salary;
    private Date dateStart;
    private Date dateEnd;
    private Short status;
    private Date createAt;
    private Date updateAt;
//        private Long employeeId;
}
