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
import java.util.Map;
import java.util.Optional;

@Repository
public interface IScheduleRepository extends JpaRepository<ClassSchedule, Integer >, JpaSpecificationExecutor<ClassSchedule> {

    @Query("SELECT cs FROM ClassSchedule cs WHERE LOWER(cs.myClass.className) LIKE LOWER(CONCAT('%', :className, '%'))")
    List<ClassSchedule> findByClassNameContaining(@Param("className") String className);

    @Query("SELECT cs FROM ClassSchedule cs WHERE LOWER(cs.subject.subjectName) LIKE LOWER(CONCAT('%', :subjectName, '%'))")
    List<ClassSchedule> findBySubjectNameContaining(@Param("subjectName") String subjectName);

    @Modifying
    @Query("UPDATE ClassSchedule cs SET cs.status = false WHERE cs.id = :id")
    void softDelete(@Param("id") Integer id);

    @Query("SELECT NEW map(CAST(c.id AS string) as id, c.className as name) FROM Class c")
    List<Map<String, String>> findDistinctClassNames();

    @Query("SELECT NEW map(cs.classroom as name) FROM ClassSchedule cs GROUP BY cs.classroom")
    List<Map<String, String>> findDistinctClassrooms();

    @Query("SELECT NEW map(CAST(s.subjectId AS string) as id, s.subjectName as name) FROM Subject s")
    List<Map<String, String>> findDistinctSubjectNames();

    @Query("SELECT NEW map(CAST(cs.staffId AS string) as id, CAST(cs.staffId AS string) as name) FROM ClassSchedule cs GROUP BY cs.staffId")
    List<Map<String, String>> findDistinctStaffIds();

}
