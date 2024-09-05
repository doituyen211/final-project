package org.green.education.repository;

import org.green.education.entity.ExamSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IExamScheduleRepository extends JpaRepository<ExamSchedule, Integer> {
}