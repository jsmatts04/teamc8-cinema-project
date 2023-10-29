package com.teamc8.repository;

import com.teamc8.model.User;
import com.teamc8.model.projection.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    //find user by email
    Optional<User> findByEmail(String email);

    //find all projects by
    List<UserInfo> findAllProjectedBy();

    //find user by id
    Optional<UserInfo> findById(int id);

    //exists user by email
    boolean existsByEmail(String email);

}
