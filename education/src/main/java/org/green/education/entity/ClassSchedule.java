package org.green.education.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "class_schedule")
public class ClassSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;
    private String time;
    private LocalDate startTime;
    private LocalDate endTime;
    @ManyToOne
    @JoinColumn (name = "class_id")
    private Class myClass;
    private String classroom;
    private Integer staffId;

    @NotNull
    @ColumnDefault("true")
    @Column(name = "status", nullable = false)
    private Boolean status;

//    @ManyToOne
//    @JoinColumn(name = "subject_id", referencedColumnName = "subject_id", foreignKey = @ForeignKey(name = "fk_subject_id_class_schedule"))
//    private Subject subject;
//
//    @ManyToOne
//    @JoinColumn(name = "class_id", referencedColumnName = "class_id", foreignKey = @ForeignKey(name = "fk_class_id_class_schedule"))
//    private Class classEntity;
}
