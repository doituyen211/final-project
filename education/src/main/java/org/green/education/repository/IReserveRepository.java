package org.green.education.repository;

import org.green.education.entity.Reserved;
import org.green.education.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface IReserveRepository extends JpaRepository<Reserved,Integer >, JpaSpecificationExecutor<Reserved> {
}
