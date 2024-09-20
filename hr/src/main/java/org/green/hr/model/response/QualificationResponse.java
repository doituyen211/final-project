package org.green.hr.model.response;

import lombok.Data;

import java.util.Date;

@Data
public class QualificationResponse {

    private Long id;
    private String qualificationName;
    private String employeeName;
    private Date expiryDate;
    private String image;
    private Short status;

}
