package com.teamc8.repository;

import com.teamc8.model.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserStatusRepository extends JpaRepository<UserStatus, Short> {

    //find by status
    Optional<UserStatus> findByStatus(String status);
}
