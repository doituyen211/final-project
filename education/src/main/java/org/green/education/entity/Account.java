package org.green.education.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Integer id;

    private String username;

    private String email ;

    private String fullName;

    private String password;

    private Role role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public enum Role {
        ADMIN,
        MANAGER,
        USER
    }
    private String status;
}
