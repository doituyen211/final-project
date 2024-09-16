package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "class_member")

public class ClassMembers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer Id ;

    @Column
    private Integer studentId ;

    @Column
    private Integer classId ;

    @Column
    private String status ;

}
