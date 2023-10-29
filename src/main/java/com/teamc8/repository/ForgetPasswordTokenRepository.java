package com.teamc8.repository;

import com.teamc8.model.ForgetPasswordToken;
import com.teamc8.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForgetPasswordTokenRepository extends JpaRepository<ForgetPasswordToken, Long> {

    Optional<ForgetPasswordToken> findByToken(String token);
    ForgetPasswordTokenRepository findByUser(User user);

}
