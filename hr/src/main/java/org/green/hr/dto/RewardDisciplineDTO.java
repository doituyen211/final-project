package org.green.hr.dto;

import lombok.*;

import java.util.Date;

@Data
public class RewardDisciplineDTO {
    private Long id;
    private String content;
    private Date decisionDate;
    private Float money;
    private String category;
    private String rdImages;
    private String rdImagesPath;
    private Short status;
    private Date createAt;
    private Date updateAt;
    private String rdCode;
    private String employeeCode;
}
