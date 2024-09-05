package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ClassMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer studentId;
    private Integer classId;
    private String status;

//    @ManyToOne
//    @JoinColumn(name = "student_id", referencedColumnName = "student_id", foreignKey = @ForeignKey(name = "fk_student_id"))
//    private Student student;

//    @ManyToOne
//    private Class class;
}