package org.green.education.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
public class CustomerDto {

    private Integer id ;

    @JsonProperty("customer_name")
    private String fullName ;

    @JsonProperty("gender")
    private String gender ;

    @JsonProperty("program_interest")
    private String programInterest ;

    @JsonProperty("program_interest_id")
    private Integer programId ;

    @JsonProperty("responsible_person")
    private String responsiblePerson ;

    private Integer responsiblePersonId ;

    @JsonProperty("phone_number")
    private String phoneNumber ;

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

    private LocalDateTime createdAt ;

    private LocalDateTime updatedAt ;
}
