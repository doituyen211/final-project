package org.green.hr.entity;

import jakarta.persistence.*;

@lombok.Getter
@lombok.Setter
@Entity
@Table(name = "employee_role")
public class EmployeeRole {
    @EmbeddedId
    private EmployeeRoleId id;

    @MapsId("employeeId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @MapsId("roleId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

}