package org.green.education.repository;

import org.green.education.entity.ExamSchedule;
import org.green.education.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IExamScheduleRepository extends JpaRepository<ExamSchedule, Integer> {

}