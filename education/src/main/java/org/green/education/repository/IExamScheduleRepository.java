package org.green.education.repository;

import org.green.education.entity.ExamSchedule;
import org.green.education.entity.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IExamScheduleRepository extends JpaRepository<ExamSchedule, Integer> {
    @Query("SELECT e FROM ExamSchedule e ORDER BY e.id ASC")
    List<ExamSchedule> findAllExamSchedule();

    Page<ExamSchedule> findAll(Pageable pageable);
}