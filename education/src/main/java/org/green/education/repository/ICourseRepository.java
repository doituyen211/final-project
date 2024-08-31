package org.green.education.repository;

import org.green.education.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ICourseRepository

    extends JpaRepository<Course,Integer >, JpaSpecificationExecutor<Course> {
        Optional<Course> findCourseByCourseName(String name) ;
}


