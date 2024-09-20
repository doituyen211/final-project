package org.green.education.repository;

import org.green.education.entity.ChangePasswordRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IChangePasswordRequestRepository extends JpaRepository<ChangePasswordRequest, Integer> {
        Optional<ChangePasswordRequest> findByToken(String token);
        }