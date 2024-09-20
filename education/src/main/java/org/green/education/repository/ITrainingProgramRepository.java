package org.green.education.repository;

import org.green.education.entity.TrainingProgram;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITrainingProgramRepository extends JpaRepository<TrainingProgram,Integer > {
    Page<TrainingProgram> findByProgramNameContainingIgnoreCase(String programName, Pageable pageable);
}
