package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "class_member")

public class ClassMembers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private  Integer id ;

    @Column(name = "student_id")
    private Integer studentId ;

    @Column(name = "class_id")
    private Integer classId ;

    @Column
    private String status ;

}
