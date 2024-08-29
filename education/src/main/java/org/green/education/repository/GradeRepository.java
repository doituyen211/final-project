package org.green.education.repository;

import org.green.education.dto.test.GradeDTO;
import org.green.education.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface GradeRepository extends JpaRepository<Grade, Integer>, JpaSpecificationExecutor<Grade> {

    @Modifying
    @Transactional
    @Query(value = "SELECT grades.id, student.full_name, grades.grade, exam_schedule.exam_date, subject.subject_name, training_program.program_name, course.course_name, grades.status FROM student INNER JOIN grades ON student.student_id = grades.student_id INNER JOIN exam_schedule ON grades.exam_schedule_id = exam_schedule.id INNER JOIN class ON exam_schedule.class_id = class.class_id INNER JOIN training_program ON class.program_id = training_program.program_id INNER JOIN course ON training_program.course_id = course.course_id INNER JOIN subject ON exam_schedule.subject_id = subject.subject_id", nativeQuery = true)
    List<GradeDTO> findStudentGrades();
}