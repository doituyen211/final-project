package org.green.hr.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;

@lombok.Getter
@lombok.Setter
@Entity
@Table(name = "insurance")
public class Insurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @NotNull
    @Column(name = "insurance_number", nullable = false, length = 50)
    private String insuranceNumber;

    @Size(max = 10)
    @NotNull
    @Column(name = "insurance_category", nullable = false, length = 10)
    private String insuranceCategory;

    @Size(max = 255)
    @NotNull
    @Column(name = "provider_address", nullable = false)
    private String providerAddress;

    @Column(name = "provider_date")
    private Date providerDate;

    @Column(name = "expiry_date")
    private Date expiryDate;

    @Size(max = 255)
    @Column(name = "clinic")
    private String clinic;

    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "update_at")
    private Date updateAt;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;


}