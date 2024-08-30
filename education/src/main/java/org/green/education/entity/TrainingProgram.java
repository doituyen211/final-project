package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class TrainingProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer programId ;

    @Column
    private String programName ;

    @Column
    private int courseId ;

    @Column
    private int tuitionFee ;

    @Column
    private Boolean status ;

    @Column
    private int trainingDuration ;

    @OneToMany(mappedBy = "trainingProgram")
    private List<Subject> subjects ;
}
