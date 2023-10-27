package com.teamc8.repository;

import com.teamc8.model.User;
import com.teamc8.model.projection.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    List<UserInfo> findAllProjectedBy();
    Optional<UserInfo> findById(int id);
    boolean existsByEmail(String email);

}
