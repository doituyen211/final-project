package org.green.hr.model.response;

import lombok.Data;

import java.time.LocalTime;
import java.util.Date;

@Data
public class TimeSheetResponse {

    private Long id;
    private Long holidayId;
    private Long employeeId;
    private String employeeName;
    private Date timeTrackingDate;
    private LocalTime timeIn;
    private LocalTime timeOut;
    private Short status;
    private Date createAt;
    private Date updateAt;
}
