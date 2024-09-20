package org.green.education.repository;

import org.green.education.entity.Student;
import org.green.education.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IStudentRepository extends JpaRepository<Student, Integer>, JpaSpecificationExecutor<Student> {
}