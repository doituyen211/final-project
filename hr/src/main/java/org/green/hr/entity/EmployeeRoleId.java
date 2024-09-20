package org.green.hr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Hibernate;

import java.util.Objects;

@lombok.Getter
@lombok.Setter
@Embeddable
public class EmployeeRoleId implements java.io.Serializable {
    private static final long serialVersionUID = 5080970027542008771L;
    @NotNull
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @NotNull
    @Column(name = "role_id", nullable = false)
    private Long roleId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        EmployeeRoleId entity = (EmployeeRoleId) o;
        return Objects.equals(this.roleId, entity.roleId) &&
                Objects.equals(this.employeeId, entity.employeeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, employeeId);
    }

}