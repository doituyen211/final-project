package org.green.education.service;

import org.green.education.form.SubjectFilterForm;
import org.springframework.http.ResponseEntity;

public interface ICustomerService {
    ResponseEntity<?> findALL(SubjectFilterForm form, int page, int pageSize,
                              String sortDir, String sortBy);
}
