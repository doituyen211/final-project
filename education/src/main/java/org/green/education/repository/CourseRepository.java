package org.green.education.repository;

import org.green.education.entity.Account;
import org.green.education.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
}
