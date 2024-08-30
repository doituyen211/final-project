package org.green.education.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer classId;
    private Integer studentId;
    private LocalDateTime attendanceDate;
    private String status;
    private String note;
    private Integer staffId;
    private Integer subjectId;

//    @ManyToOne
//    @JoinColumn(name = "class_id", referencedColumnName = "class_id", foreignKey = @ForeignKey(name = "fk_class_id"))
//    private Class classEntity;
//
//    @ManyToOne
//    @JoinColumn(name = "student_id", referencedColumnName = "student_id", foreignKey = @ForeignKey(name = "fk_student_id_attendance"))
//    private Student student;
//
//    @ManyToOne
//    @JoinColumn(name = "subject_id", referencedColumnName = "subject_id", foreignKey = @ForeignKey(name = "fk_subject_id"))
//    private Subject subject;
}