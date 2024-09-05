package org.green.education.repository;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IGradeRepository extends JpaRepository<Grade, Integer>, JpaSpecificationExecutor<Grade> {

//    @Modifying
//    @Query("SELECT new org.green.education.dto.GradeDTO(s.fullName, g.grade, es.examDate, sub.subjectName, tp.programName, c.courseName, g.status) " +
//            "FROM Student s " +
//            "JOIN Grade g ON s.id = g.id " +
//            "JOIN ExamSchedule es ON g.id = es.id " +
//            "JOIN Class cls ON es.id = cls.id " +
//            "JOIN TrainingProgram tp ON cls.id = tp.programId " +
//            "JOIN Course c ON tp.course.id = c.id " +
//            "JOIN Subject sub ON es.id = sub.subjectId")
//    List<GradeDTO> findStudentGrades();
    @Modifying
    @Query(value = "SELECT g.id AS id, g.grade AS grade, g.status AS status, " +
            "s.full_name AS fullName, es.exam_date AS examDate " +
            "FROM grades g " +
            "JOIN student s ON g.student_id = s.id " +
            "JOIN exam_schedule es ON g.exam_schedule_id = es.id",
            nativeQuery = true)
    List<GradeDTO> findStudentGrades();
}