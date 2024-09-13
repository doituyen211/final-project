package org.green.education.repository;

import org.green.education.dto.AttendanceDetailDTO;
import org.green.education.dto.AttendanceSumDTO;
import org.green.education.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IAttendanceRepository extends JpaRepository<Attendance, Integer> {
    @Query("SELECT new org.green.education.dto.AttendanceSumDTO(s.fullName, sub.subjectName, sub.subjectId, "
            + "COUNT(a.status), "
            + "SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END), "
            + "SUM(CASE WHEN a.status = 'Absent' THEN 1 ELSE 0 END), "
            + "SUM(CASE WHEN a.status = 'Late' THEN 1 ELSE 0 END), "
            + "SUM(CASE WHEN a.status = 'OnLeave' THEN 1 ELSE 0 END)) "
            + "FROM Attendance a "
            + "JOIN Student s ON a.student.id = s.id "
            + "JOIN Subject sub ON a.subject.subjectId = sub.subjectId "
            + "WHERE a.myClass.id = :classId AND s.id = :studentId "
            + "GROUP BY s.fullName, sub.subjectName, sub.subjectId")
    // lay tong so buoi trang thai diem danh
    List<AttendanceSumDTO> getAttendanceSummary(@Param("classId") int classId, @Param("studentId") int studentId);

    @Query("SELECT new org.green.education.dto.AttendanceDetailDTO(a.attendanceDate, a.status, a.note) "
            + "FROM Attendance a "
            + "WHERE a.student.id = :studentId "
            + "AND a.myClass.id = :classId "
            + "AND a.subject.subjectId = :subjectId")
    List<AttendanceDetailDTO> getAttendanceDetailsBySubjectId(@Param("studentId") int studentId, @Param("classId") int classId, @Param("subjectId") int subjectId);
}
