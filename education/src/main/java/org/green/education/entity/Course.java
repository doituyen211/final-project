package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "course_id_gen")
    @SequenceGenerator(name = "course_id_gen", sequenceName = "Course_course_id_seq", allocationSize = 1)
    @Column(name = "course_id", nullable = false)
    private Integer id;

    @Column(name = "course_name", length = Integer.MAX_VALUE)
    private String courseName;

}