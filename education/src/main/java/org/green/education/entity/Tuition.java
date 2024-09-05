package org.green.education.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Tuition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer studentId;
    private Integer programId;
    private Double amount;
    private String paymentMethod;
    private LocalDateTime paymentDate;
    private Integer status;
    private String note;

//    @ManyToOne
//    @JoinColumn(name = "student_id", referencedColumnName = "student_id", foreignKey = @ForeignKey(name = "fk_student_id"))
//    private Student student;
//
//    @ManyToOne
//    @JoinColumn(name = "program_id", referencedColumnName = "program_id", foreignKey = @ForeignKey(name = "fk_program_id"))
//    private TrainingProgram trainingProgram;
}