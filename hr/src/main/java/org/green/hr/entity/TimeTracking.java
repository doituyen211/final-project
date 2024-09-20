package org.green.hr.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@lombok.Getter
@lombok.Setter
@Entity
@Table(name = "time_tracking")
public class TimeTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "time_tracking_date", nullable = false)
    private Date timeTrackingDate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "holiday_id", nullable = false)
    private Holiday holiday;

    @NotNull
    @Column(name = "time_in", nullable = false)
    private Date timeIn;

    @NotNull
    @Column(name = "time_out", nullable = false)
    private Date timeOut;

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