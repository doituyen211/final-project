package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "subject")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "subject_id_gen")
    @SequenceGenerator(name = "subject_id_gen", sequenceName = "Subject_subject_id_seq", allocationSize = 1)
    @Column(name = "subject_id", nullable = false)
    private Integer id;

    @Column(name = "subject_name", length = Integer.MAX_VALUE)
    private String subjectName;

    @Column(name = "status")
    private Integer status;

    @Column(name = "training_duration")
    private Integer trainingDuration;

    @Column(name = "training_program_id")
    private Integer trainingProgramId;

}