package org.green.education.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "training_program")

public class TrainingProgram {
    @Id
    @Column(name = "program_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer programId ;

    @Column(name = "program_name")
    private String programName ;
    
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course ; // ????????? chac la schoolYear

    @Column(name = "tuition_fee")
    private int tuitionFee ;

    private Boolean status ;

    @Column(name = "training_duration")
    private int trainingDuration ;

    @OneToMany(mappedBy = "trainingProgram")
    private List<Subject> listsubjects ;
//
    @OneToMany(mappedBy = "program")
    private List<Class> listClasses ;
}
