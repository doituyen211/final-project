package org.green.education.service;

import jakarta.transaction.Transactional;
import org.green.education.entity.Account;
import org.green.education.entity.Grade;
import org.green.education.entity.Reserved;
import org.green.education.form.AccountCreateForm;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IReserveService {

    Reserved findReserveByStudentId(int studentId);

    Reserved save(Reserved reserved);

    void  deleteById (int studentId);

    Reserved updateReserved(int id, Reserved reserved);

}
