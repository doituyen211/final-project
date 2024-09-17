package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Entity
@Data
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subjectId;

    private String subjectName;

    private int trainingDuration;

    private int status;

    @ManyToOne
    @JoinColumn(name = "training_program_id")
    private TrainingProgram trainingProgram ;

    @OneToOne(mappedBy = "subject")
    private LeaveOfAbsence leaveOfAbsence;

    @OneToMany(mappedBy = "subject")
    private List<Attendance> attendanceList;

}
