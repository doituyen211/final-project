package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Integer id ;

    @Column(name = "subject_name")
    private String name;

    private String status ;

    @Column(name = "training_duration")
    private int duration ;

    @ManyToOne
    @JoinColumn(name = "training_program_id", referencedColumnName = "programId")
    private TrainingProgram trainingProgram ;
}
