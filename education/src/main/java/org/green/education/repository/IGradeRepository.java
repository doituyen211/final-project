package org.green.education.repository;

import org.green.core.model.CoreResponse;
import org.green.education.dto.ProgramDTO;
import org.green.education.dto.StudentDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Grade;
import org.springframework.data.domain.Sort;
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

//    @Query()
//    List<Grade> getAllGrade(Integer subjectId);
//
//    @Query("""
//            select g from Grade g
//            where g.id = ?1 and g.grade = ?2 and g.status = ?3 and g.examSchedule.subject.subjectName = ?4""")
//    List<Grade> getAllGradeByExamDate(Integer id, Integer grade, String status, String subjectName, Sort sort);

}