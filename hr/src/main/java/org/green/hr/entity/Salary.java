package org.green.hr.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@lombok.Getter
@lombok.Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "salary")
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "contract_id")
    private Long contractId;

    @Column(name = "overtime_id")
    private Long overtimeId;

    @Column(name = "allowance_id")
    private Long allowanceId;

    @Column(name = "salary_advance_id")
    private Long salaryAdvanceId;

    @Column(name = "reward_discipline_id")
    private Long rewardDisciplineId;

    @Column(name = "time_off_id")
    private Long timeOffId;

    @NotNull
    @Column(name = "salary", nullable = false)
    private Float salary;

    @Column(name = "status")
    private Short status;

    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "update_at")
    private Date updateAt;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

}