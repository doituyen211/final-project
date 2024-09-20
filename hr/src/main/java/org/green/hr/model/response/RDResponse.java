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
public class RDResponse {
    private Long id;
    private String content;
    private Date decisionDate;
    private Float money;
    private String category;
    private short status;
    private Date createAt;
    private Date updateAt;
    private String rdImages;
    private String rdCode;
    private String employeeCode;
    private String message;

    // Constructor nhận một thông báo
    public RDResponse(String message) {
        this.message = message;
    }
}
