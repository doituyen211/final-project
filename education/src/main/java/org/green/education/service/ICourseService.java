package org.green.education.service;

import org.green.education.dto.CourseDto;
import org.green.education.form.CourseFilterForm;
import org.springframework.http.ResponseEntity;

public interface ICourseService {

    ResponseEntity<?> create(CourseDto courseDto);

    ResponseEntity<?> findALL(CourseFilterForm form , int page , int pageSize,
                              String sortDir, String sortBy     ) ;

    ResponseEntity<?> findById(Integer id);

    ResponseEntity<?> updateById(Integer id, CourseDto courseDto);

    ResponseEntity<?> deleteById(Integer id);

    ResponseEntity<?> findnoALL(CourseFilterForm form ,
                              String sortDir, String sortBy     ) ;

}
