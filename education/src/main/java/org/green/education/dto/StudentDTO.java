package org.green.education.dto;


import lombok.*;
import org.green.education.entity.Student;

import java.time.LocalDate;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO{
    private Integer id;
    private String fullName;
    private LocalDate dateOfBirth;
    private String address;
    private String email;
//    private String phoneNumber;
//    private String source;
//    private Integer campaignId;
    private String facebookLink;
//    private String note;
    private String learningGoal;
//    private Integer programId;
//    private AccountDto account;

}