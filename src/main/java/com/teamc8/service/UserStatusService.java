package com.teamc8.service;

import com.teamc8.exception.UserStatusNotFoundException;
import com.teamc8.model.UserStatus;
import com.teamc8.repository.UserStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserStatusService {

    private final UserStatusRepository userStatusRepository;

    public UserStatus getUserStatusById(short id) {
        return userStatusRepository.findById(id)
                .orElseThrow(() -> new UserStatusNotFoundException("User status id not found:" + id));
    }

    public UserStatus getUserStatusByStatus(String status) {
        return userStatusRepository.findByStatus(status)
                .orElseThrow(() -> new UserStatusNotFoundException("User status not found: " + status));
    }

}
