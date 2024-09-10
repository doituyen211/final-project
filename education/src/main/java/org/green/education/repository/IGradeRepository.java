package org.green.education.repository;

import org.green.education.dto.GradeDTO;
import org.green.education.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IGradeRepository extends JpaRepository<Grade, Integer>, JpaSpecificationExecutor<Grade> {

}