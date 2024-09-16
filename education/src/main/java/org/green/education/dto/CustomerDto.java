package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CustomerDto {

    private Integer customerId ;

    @JsonProperty("customer_name")
    private String customerName ;

    @JsonProperty("gender")
    private String gender ;

    @JsonProperty("program_interest")
    private String programInterest ;

    private Integer programInterestId ;

    @JsonProperty("record_time")
    private String recordTime ;

    @JsonProperty("responsible_person")
    private String responsiblePerson ;

    private Integer responsiblePersonId ;

    @JsonProperty("phone_number")
    private String phone ;

    @JsonProperty("source")
    private String source ;

    private Integer campaignId;

    @JsonProperty("address")
    private String address ;

    private String facebookLink;

    @JsonProperty("note")
    private String note ;

    @JsonProperty("trang_thai")
    private int status;
}
