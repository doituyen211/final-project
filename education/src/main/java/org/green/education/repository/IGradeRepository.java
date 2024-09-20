package org.green.education.repository;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGradeRepository extends JpaRepository<Grade, Integer>, JpaSpecificationExecutor<Grade> {

    @Query("select s.subjectId, s.subjectName from Subject s")
    List<Object[]> getSubjectNameForGrade();

    @Query("select tp.programId, tp.programName from TrainingProgram tp")
    List<Object[]> getProgramNameForGrade();

    @Query("select s.id, s.fullName from Student s")
    List<Object[]> getStudentForGrade();

    @Query("select g from Grade g where g.activate = true")
    List<Grade> getActiveGrade();

    @Query("select g.id, s.fullName, g.grade, es.examDate, sub.subjectName, tp.programName, co.courseName, g.status " +
            "from Grade g " +
            "join g.student s " +
            "join g.examSchedule es " +
            "join es.subject sub " +
            "join es.classField c " +
            "join c.program tp " +
            "join tp.course co " +
            "where g.activate = true"
    )
    List<Object[]> findAllGrade();
//    List<GradeDTO>findAllGrade();

}