package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer subjectId ;

    @Column
    private String subjectName ;

    @Column
    private int trainingDuration ;

    @Column
    private int status ;

    @ManyToOne
    @JoinColumn(name = "training_program_id", referencedColumnName = "programId")
    private TrainingProgram trainingProgram ;
}
