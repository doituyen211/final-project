package org.green.education.repository;


import org.green.education.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAuthRepository extends JpaRepository<Account, Integer> {
    Account findByEmail(String email);
    Account findByUsername(String username) ;
    Boolean existsByEmail(String email) ;

}
