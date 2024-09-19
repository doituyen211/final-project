package org.green.education.service;

import org.green.education.dto.ClassMembersDto;
import org.green.education.form.ClassMembersFillterForm;
import org.springframework.http.ResponseEntity;

public interface IClassMembersService {

    ResponseEntity<?> create(ClassMembersDto classMembersDto);

    ResponseEntity<?> findALL(ClassMembersFillterForm form, int page, int pageSize,
            String sortDir, String sortBy);

    ResponseEntity<?> findById(Integer id);

    ResponseEntity<?> updateById(Integer id, ClassMembersDto classMembersDto);

    ResponseEntity<?> deleteById(Integer id);

}
