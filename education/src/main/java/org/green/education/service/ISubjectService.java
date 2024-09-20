package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.SubjectDto;
import org.green.education.form.SubjectFilterForm;
import org.springframework.http.ResponseEntity;

public interface ISubjectService {
    CoreResponse<?> create(SubjectDto subjectDto);

    CoreResponse<?> findALL(SubjectFilterForm form , int page , int pageSize,
                               String sortDir, String sortBy     ) ;
    CoreResponse<?> findById(Integer id);

    CoreResponse<?> updateById(Integer id, SubjectDto subjectDto);

    CoreResponse<?> deleteById(Integer id);
    CoreResponse<?> findAllNotPaging( ) ;
    CoreResponse<?> GetAllProgram( ) ;
}
