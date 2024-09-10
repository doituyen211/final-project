package org.green.education.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


//@NamedNativeQuery: Được sử dụng để định nghĩa các truy vấn SQL thuần túy có tên mà có thể được gọi lại từ mã nguồn. Điều này giúp quản lý các truy vấn SQL lớn hoặc phức tạp một cách hiệu quả hơn.
//@SqlResultSetMapping: Được sử dụng để ánh xạ kết quả của các truy vấn SQL thuần túy vào các thực thể hoặc đối tượng DTO. Điều này giúp kiểm soát cách dữ liệu từ cơ sở dữ liệu được chuyển đổi thành các đối tượng Java


@Getter
@Setter
@Entity
@Table(name = "grades")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "grades_id_gen", sequenceName = "Grades_id_seq", allocationSize = 1)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_schedule_id")
    private ExamSchedule examSchedule;

    @Column(name = "grade")
    private Integer grade;

    @Column(name = "status", length = Integer.MAX_VALUE)
    private String status;

    public Grade() {

    }
}