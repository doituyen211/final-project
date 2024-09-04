package org.green.education.service;

import org.green.education.entity.ExamSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IExamScheduleRepository extends JpaRepository<ExamSchedule, Integer> {
}