package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.form.CustomerFilterForm;
import org.green.education.form.SubjectFilterForm;
import org.springframework.http.ResponseEntity;

public interface ICustomerService {
    CoreResponse<?> findALL(CustomerFilterForm form, int page, int pageSize,
                            String sortDir, String sortBy);
}
