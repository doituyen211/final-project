package org.green.education.service;


import jakarta.transaction.Transactional;
import org.green.education.entity.Account;
import org.green.education.form.AccountCreateForm;
import org.green.education.form.AccountFilterForm;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IAccountService {
    Page<Account> findAll(AccountFilterForm form, int pageNo, int pageSize, String sortBy, String sortDir);

    Account findById(Integer id);

    @Transactional
    void create(AccountCreateForm form);

    void update(Account form);

    void deleteById(Integer id);

    void deleteAllById(List<Integer> ids);
}
