package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data

public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer courseId ;

    @Column
    private String courseName ;

}
