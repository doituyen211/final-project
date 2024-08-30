package org.green.education.repository;

import org.green.education.dto.test.GradeDTO;
import org.green.education.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
//import org.green.education.dto.test.GradeDTO;
import java.util.List;


@Repository
public interface GradeRepository extends JpaRepository<Grade, Integer>, JpaSpecificationExecutor<Grade> {

    @Modifying
    @Transactional
    @Query("SELECT new org.green.education.dto.test.GradeDTO(s.fullName, g.grade, es.examDate, sub.subjectName, tp.programName, c.courseName, g.status) " +
            "FROM Student s " +
            "JOIN Grade g ON s.id = g.id " +
            "JOIN ExamSchedule es ON g.id = es.id " +
            "JOIN Class cls ON es.id = cls.id " +
            "JOIN TrainingProgram tp ON cls.id = tp.id " +
            "JOIN Course c ON tp.id = c.id " +
            "JOIN Subject sub ON es.id = sub.id")
//    @Query(value = "SELECT student.full_name AS full_name, grades.grade AS grade, exam_schedule.exam_date AS exam_date, subject.subject_name AS subject_name, training_program.program_name AS program_name, course.course_name AS course_name, grades.status AS status FROM student INNER JOIN grades ON student.student_id = grades.student_id INNER JOIN exam_schedule ON grades.exam_schedule_id = exam_schedule.id INNER JOIN class ON exam_schedule.class_id = class.class_id INNER JOIN training_program ON class.program_id = training_program.program_id INNER JOIN course ON training_program.course_id = course.course_id INNER JOIN subject ON exam_schedule.subject_id = subject.subject_id", nativeQuery = true)
    List<GradeDTO> findStudentGrades();
}