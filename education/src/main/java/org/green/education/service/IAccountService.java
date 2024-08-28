package com.green.api.service;


import com.green.api.entity.Account;
import com.green.api.form.AccountCreateForm;
import com.green.api.form.AccountFilterForm;
import jakarta.transaction.Transactional;
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
