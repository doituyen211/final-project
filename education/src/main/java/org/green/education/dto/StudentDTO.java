package org.green.education.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.green.education.entity.Student;

import java.time.LocalDate;

@Builder
@Setter
@Getter
@NoArgsConstructor
public class StudentDTO{
    private Integer id;
    private String fullName;
    private LocalDate dateOfBirth;
    private String address;
    private String email;
    private String phoneNumber;
    private String source;
    private Integer campaignId;
    private String facebookLink;
    private String note;
    private String learningGoal;
    private Integer programId;
    private AccountDto account;

    public StudentDTO(Integer id, String fullName, LocalDate dateOfBirth, String address, String email, String phoneNumber, String source, Integer campaignId, String facebookLink, String note, String learningGoal, Integer programId, AccountDto account) {
        this.id = id;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.source = source;
        this.campaignId = campaignId;
        this.facebookLink = facebookLink;
        this.note = note;
        this.learningGoal = learningGoal;
        this.programId = programId;
        this.account = account;
    }

    public StudentDTO(Student student) {
        this.fullName = student.getFullName();
    }
}