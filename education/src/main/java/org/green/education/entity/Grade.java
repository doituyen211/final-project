package org.green.education.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "grades")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "grades_id_gen")
    @SequenceGenerator(name = "grades_id_gen", sequenceName = "Grades_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_schedule_id")
    @JsonIgnore
    private ExamSchedule examSchedule;

    @Column(name = "grade")
    private Integer grade;

    @Column(name = "status", length = Integer.MAX_VALUE)
    private String status;

}