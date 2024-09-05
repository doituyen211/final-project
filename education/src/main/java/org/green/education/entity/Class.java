package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "class")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id", nullable = false)
    private Integer id;

    private String className;

    private Integer classSize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    private TrainingProgram program;

    private LocalDate startDate;

    private LocalDate endDate;

}