package org.green.education.repository;

import org.green.education.entity.Class;
import org.green.education.entity.Subject;
import org.green.education.entity.TrainingProgram;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ISubjectRepository extends JpaRepository<Subject, Integer>, JpaSpecificationExecutor<Subject> {
    Optional<Subject> findSubjectBySubjectName(String name);

    Page<Subject> findByTrainingProgram(TrainingProgram trainingProgram, Pageable pageable);
}

