package org.green.education.repository;

import org.green.education.entity.ClassMembers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IClassMembersRepository
        extends JpaRepository<ClassMembers, Integer>, JpaSpecificationExecutor<ClassMembers> {
    Optional<ClassMembers> findClassMembersByStatus(String name);

    @Query("select count(cm.student) from ClassMembers cm where cm.mclass.id = ?1")
    int countStudentsByClassId(Integer classId);
}
