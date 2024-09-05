package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
@Table(name="reservation")
public class Reserved {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @OneToOne(cascade = {
            CascadeType.DETACH,
            CascadeType.MERGE,
            CascadeType.PERSIST,
            CascadeType.REFRESH})
    @JoinColumn(name = "student_id", referencedColumnName = "id")
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
