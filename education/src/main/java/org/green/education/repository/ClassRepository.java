package org.green.education.repository;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.green.education.dto.ClassDTO;
import org.green.education.dto.ClassMemberDTO;
import org.green.education.entity.Class;
import org.green.education.entity.TrainingProgram;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
public interface ClassRepository extends JpaRepository<Class, Integer>, JpaSpecificationExecutor<Class> {
    @Query("SELECT new org.green.education.dto.ClassMemberDTO(s.fullName, cm.status) " +
            "FROM ClassMember cm JOIN student s ON cm.student.id = s.id " +
            "WHERE cm.mclass.id = ?1")
    List<ClassMemberDTO> getListStudentByClassId(int classId);

    List<Class> findByClassNameContainingIgnoreCase(String className);

    List<Class> findByStartDateAndEndDate(LocalDate startDate, LocalDate endDate);

    Page<Class> findByProgram(TrainingProgram trainingProgram, Pageable pageable);

    Optional<Class> findByClassName(String className);

    @Query("SELECT c FROM Class c WHERE c.active = true")
    List<Class> getClassIsActive();

}
