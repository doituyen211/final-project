package com.green.api.repository;


import com.green.api.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAuthRepository extends JpaRepository<Account, Integer> {
    Account findByEmail(String email);
}
