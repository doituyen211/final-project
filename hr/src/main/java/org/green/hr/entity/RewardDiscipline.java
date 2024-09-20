package org.green.hr.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;

@lombok.Getter
@lombok.Setter
@Entity
@Table(name = "reward_discipline")
public class RewardDiscipline {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "content", nullable = false, length = Integer.MAX_VALUE)
    private String content;

    @NotNull
    @Column(name = "decision_date", nullable = false)
    private Date decisionDate;

    @Column(name = "money")
    private Float money;

    @Size(max = 50)
    @Column(name = "category", length = 50)
    private String category;

    @Column(name = "status")
    private Short status;

    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "update_at")
    private Date updateAt;

    @Column(name = "rd_images")
    private String rdImages;

    @Column(name = "rd_code")
    private String rdCode;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

}