package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "training_program")
public class TrainingProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "training_program_id_gen")
    @SequenceGenerator(name = "training_program_id_gen", sequenceName = "Training_Program_program_id_seq", allocationSize = 1)
    @Column(name = "program_id", nullable = false)
    private Integer id;

    @Column(name = "program_name", length = Integer.MAX_VALUE)
    private String programName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(name = "tuition_fee")
    private Integer tuitionFee;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "training_duration")
    private Integer trainingDuration;

}