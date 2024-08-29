package org.green.education.service;

import org.green.education.dto.SubjectDto;
import org.green.education.form.SubjectFilterForm;
import org.springframework.http.ResponseEntity;

public interface ISubjectService {
    ResponseEntity<?> create(SubjectDto subjectDto);

     ResponseEntity<?> findALL(SubjectFilterForm form , int page , int pageSize,
                               String sortDir, String sortBy     ) ;
    ResponseEntity<?> findById(Integer id);

    ResponseEntity<?> updateById(Integer id, SubjectDto subjectDto);

    ResponseEntity<?> deleteById(Integer id);
}
