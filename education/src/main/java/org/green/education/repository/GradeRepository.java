package org.green.education.repository;

import org.green.education.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
//import org.springframework.data.jpa.repository.Query;

//import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, Integer>, JpaSpecificationExecutor<Grade> {
}