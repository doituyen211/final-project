package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "exam_schedule")
public class   ExamSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "exam_schedule_id_gen")
    @SequenceGenerator(name = "exam_schedule_id_gen", sequenceName = "Exam_Schedule_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Class classField;

    @Column(name = "exam_date")
    private LocalDate examDate;

    @Column(name = "exam_link", length = Integer.MAX_VALUE)
    private String examLink;

}