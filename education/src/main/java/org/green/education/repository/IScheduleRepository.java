package org.green.education.repository;

import org.green.education.dto.ClassScheduleDto;
import org.green.education.entity.ClassSchedule;
import org.green.education.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IScheduleRepository extends JpaRepository<ClassSchedule, Integer >, JpaSpecificationExecutor<ClassSchedule> {
//    @Modifying
//    @Query("SELECT new org.green.education.dto.ScheduleDTO(s.fullName, g.grade, es.examDate, sub.subjectName, tp.programName, c.courseName, g.status) " +
//            "FROM Student s " +
//            "JOIN Grade g ON s.id = g.id " +
//            "JOIN ExamSchedule es ON g.id = es.id " +
//            "JOIN Class cls ON es.id = cls.id " +
//            "JOIN TrainingProgram tp ON cls.id = tp.programId " +
//            "JOIN Course c ON tp.course.id = c.id " +
//            "JOIN Subject sub ON es.id = sub.subjectId")
//    List<ScheduleDTO> findSchedule();

//    @Modifying
//    @Query(value = "select * from class_schedule where id = ?", nativeQuery = true)
//    Optional<ClassSchedule> getScheduleById(int id);


    @Query("SELECT cs FROM ClassSchedule cs WHERE LOWER(cs.myClass.className) LIKE LOWER(CONCAT('%', :className, '%'))")
    List<ClassSchedule> findByClassNameContaining(@Param("className") String className);

    @Query("SELECT cs FROM ClassSchedule cs WHERE LOWER(cs.subject.subjectName) LIKE LOWER(CONCAT('%', :subjectName, '%'))")
    List<ClassSchedule> findBySubjectNameContaining(@Param("subjectName") String subjectName);
}
