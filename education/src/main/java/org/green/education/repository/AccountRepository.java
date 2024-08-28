package org.green.education.repository;

import org.green.education.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account,Integer> {
}
