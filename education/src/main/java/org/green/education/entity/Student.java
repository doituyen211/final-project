package org.green.education.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_id_gen")
    @SequenceGenerator(name = "student_id_gen", sequenceName = "Student_student_id_seq", allocationSize = 1)
    @Column(name = "student_id", nullable = false)
    private Integer id;

    @Column(name = "full_name", length = Integer.MAX_VALUE)
    private String fullName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "address", length = Integer.MAX_VALUE)
    private String address;

    @Column(name = "email", length = Integer.MAX_VALUE)
    private String email;

    @Size(max = 20)
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "source", length = Integer.MAX_VALUE)
    private String source;

    @Column(name = "campaign_id")
    private Integer campaignId;

    @Column(name = "facebook_link", length = Integer.MAX_VALUE)
    private String facebookLink;

    @Column(name = "note", length = Integer.MAX_VALUE)
    private String note;

    @Column(name = "learning_goal", length = Integer.MAX_VALUE)
    private String learningGoal;

    @Column(name = "program_id")
    private Integer programId;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "account_id", foreignKey = @ForeignKey(name = "fk_account_id"))
    private Account account;

    @OneToOne(mappedBy = "student")
    private Reserved reserved;

}