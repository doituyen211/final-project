package org.green.education.service;

import org.green.education.entity.Account;
import org.green.education.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountRepository repository ;
    public List<Account> getALL () {
        return repository.findAll() ;
    }
}
