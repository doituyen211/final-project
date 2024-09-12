package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "class_schedule")
public class ClassSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer subjectId;
    private String time;
    private Date startTime;
    private Date endTime;
    private Integer classId;
    private String classroom;
    private Integer staffId;


//    @ManyToOne
//    @JoinColumn(name = "subject_id", referencedColumnName = "subject_id", foreignKey = @ForeignKey(name = "fk_subject_id_class_schedule"))
//    private Subject subject;
//
//    @ManyToOne
//    @JoinColumn(name = "class_id", referencedColumnName = "class_id", foreignKey = @ForeignKey(name = "fk_class_id_class_schedule"))
//    private Class classEntity;
}
