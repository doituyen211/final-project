package org.green.education.repository;

import org.green.education.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ISubjectRepository  extends JpaRepository<Subject,Integer >, JpaSpecificationExecutor<Subject> {
    Optional<Subject> findSubjectBySubjectName(String name) ;

}

