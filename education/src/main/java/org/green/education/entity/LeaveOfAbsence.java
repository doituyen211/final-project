package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name="leave_of_absence")
public class LeaveOfAbsence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @OneToOne(cascade = {
            CascadeType.DETACH,
            CascadeType.MERGE,
            CascadeType.PERSIST,
            CascadeType.REFRESH})
    @JoinColumn(name = "student_id", referencedColumnName = "student_id")
    private  Student student;

    @Column(name="start_time")
    private Date startTime;

    @Column(name="end_time")
    private Date endTime;

    @Column(name="status")
    private int status;

    @OneToOne(cascade = {
            CascadeType.DETACH,
            CascadeType.MERGE,
            CascadeType.PERSIST,
            CascadeType.REFRESH})
    @JoinColumn(name = "subject_id", referencedColumnName = "subjectId")
    private Subject subject;



}
