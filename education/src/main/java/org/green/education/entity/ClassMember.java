package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ClassMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class mclass;

    private String status;

//    @ManyToOne
//    @JoinColumn(name = "student_id", referencedColumnName = "student_id", foreignKey = @ForeignKey(name = "fk_student_id"))
//    private Student student;

//    @ManyToOne
//    private Class class;
}