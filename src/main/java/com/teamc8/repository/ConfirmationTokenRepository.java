package com.teamc8.repository;

import com.teamc8.model.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


//repository for confirmation token
@Repository
public interface ConfirmationTokenRepository
        extends JpaRepository <ConfirmationToken, Long> {

    Optional<ConfirmationToken> findByToken(String token); //find confirmation token by token

    ConfirmationToken findFirstByUserIdOrderByTimeCreatedAtDesc(int id); //find confirmation token by
}
