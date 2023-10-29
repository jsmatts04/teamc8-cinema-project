package com.teamc8.service;

import com.teamc8.exception.UserTypeNotFoundException;
import com.teamc8.model.UserType;
import com.teamc8.repository.UserTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserTypeService {

    private final UserTypeRepository userTypeRepository;

    //get user type by id
    public UserType getUserTypeById(short id) {
        return userTypeRepository.findById(id).orElseThrow(() -> new UserTypeNotFoundException("User type does not exist" + id));
    }

}
