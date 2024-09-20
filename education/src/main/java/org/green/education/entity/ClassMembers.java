package org.green.education.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "class_member" )
public class ClassMembers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class mclass;

    private Integer status;

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private  Integer id ;
//
//    @Column(name = "student_id")
//    private Integer studentId;
//
//    @Column(name = "class_id")
//    private Integer classId;
//
//    @Column
//    private Integer status ;



}
