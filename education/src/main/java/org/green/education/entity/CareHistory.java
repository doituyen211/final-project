package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class CareHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer studentId;
    private Integer staffId;
    private LocalDateTime updateTime;
    private String note;
    private Integer statusId;

//    @ManyToOne
//    @JoinColumn(name = "student_id", referencedColumnName = "student_id", foreignKey = @ForeignKey(name = "fk_student_id"))
//    private Student student;
//
//    @ManyToOne
//    @JoinColumn(name = "status_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_status_id"))
//    private StudentStatus status;
}
