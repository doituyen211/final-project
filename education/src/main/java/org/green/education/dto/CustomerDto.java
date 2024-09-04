package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CustomerDto {

    @JsonProperty("customer_name")
    private String customerName ;

    @JsonProperty("gender")
    private String gender ;

    @JsonProperty("program_interest")
    private String programInterest ;

    @JsonProperty("record_time")
    private String recordTime ;

    @JsonProperty("responsible_person")
    private String responsiblePerson ;

    @JsonProperty("phone_number")
    private String phone ;

    @JsonProperty("source")
    private String source ;

    @JsonProperty("address")
    private String address ;

    @JsonProperty("note")
    private String note ;

    @JsonProperty("trang_thai")
    private int status;
}
