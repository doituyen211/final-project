package org.green.hr.dto;

import lombok.Data;

import java.util.Date;

@Data
public class QualificationDTO {
    private Long id;
    private String qualificationName;
    private Long employeeId;
    private Date expiryDate;
    private String image;
    private Short status;
    private Date createAt;
    private Date updateAt;
}
