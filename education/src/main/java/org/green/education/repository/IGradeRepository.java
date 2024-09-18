package org.green.education.repository;

import org.green.core.model.CoreResponse;
import org.green.education.dto.ProgramDTO;
import org.green.education.dto.StudentDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IGradeRepository extends JpaRepository<Grade, Integer>, JpaSpecificationExecutor<Grade> {

//    @Query(value = "select subject_name, subject_id from Subject", nativeQuery = true)
//    List<SubjectDto> getSubjectNameForGrade();
//
//    @Query(value= "select program_name, program_id from TrainingProgram", nativeQuery = true)
//    List<ProgramDTO> getProgramNameForGrade();
//
//    @Query(value = "select full_name, student_id from Student ", nativeQuery = true)
//    List<StudentDTO> getStudentForGrade();

    @Query("select new org.green.education.dto.SubjectDto(s.subjectId, s.subjectName) from Subject s")
    List<SubjectDto> getSubjectNameForGrade();

    @Query("select new org.green.education.dto.ProgramDTO(tp.programId, tp.programName) from TrainingProgram tp")
    List<ProgramDTO> getProgramNameForGrade();

    @Query("select new org.green.education.dto.StudentDTO(s.id, s.fullName) from Student s")
    List<StudentDTO> getStudentForGrade();

}