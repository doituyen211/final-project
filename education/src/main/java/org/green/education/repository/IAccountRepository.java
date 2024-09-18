package org.green.education.repository;


import org.green.education.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IAccountRepository extends JpaRepository<Account, Integer>, JpaSpecificationExecutor<Account> {
    Boolean existsByEmail(String email) ;

    Account findAccountByUsername(String username) ;
}