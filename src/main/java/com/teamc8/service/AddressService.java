package com.teamc8.service;

import com.teamc8.model.Address;
import com.teamc8.model.projection.AddressProjection;
import com.teamc8.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public List<AddressProjection> getAllAddresses() {
        return addressRepository.findAllProjectedBy();
    }

    public AddressProjection getAddressByUserId(int id) {
        return addressRepository.findByUserId(id).orElseThrow(() -> new RuntimeException("Address not found"));
    }
}
