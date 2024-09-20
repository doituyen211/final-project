package org.green.hr.model.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class AllowanceResponse {

    private Long id;
    private String allowanceCategory;
    private Float allowanceSalary;
    private Short status;
    private Date createAt;
    private Date updateAt;
    private Long positionId;
    private String positionName;

}
