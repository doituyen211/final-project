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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "class_id_gen")
    @SequenceGenerator(name = "class_id_gen", sequenceName = "Class_class_id_seq", allocationSize = 1)
    @Column(name = "class_id", nullable = false)
    private Integer id;

    @Column(name = "class_name", length = Integer.MAX_VALUE)
    private String className;

    @Column(name = "class_size")
    private Integer classSize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    private TrainingProgram program;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

}