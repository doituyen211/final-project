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
public class ContractResponse {
    private Long id;
    private String contractCode;
    private String contractCategory;
    private String contentContract;
    private Float salary;
    private Date dateStart;
    private Date dateEnd;
    private Short status;
    private Date createAt;
    private Date updateAt;
    private String employeeCode;
    private String message;

    // Constructor nhận một thông báo
    public ContractResponse(String message) {
        this.message = message;
    }
}
