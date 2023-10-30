package com.teamc8.service;

import com.teamc8.config.JwtService;
import com.teamc8.exception.UserNotFoundException;
import com.teamc8.model.Address;
import com.teamc8.model.User;
import com.teamc8.model.dto.EditAddressDTO;
import com.teamc8.model.projection.AddressProjection;
import com.teamc8.model.projection.UserInfo;
import com.teamc8.model.request.NewAddressRequest;
import com.teamc8.repository.AddressRepository;
import com.teamc8.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public List<AddressProjection> getAllAddresses() {
        return addressRepository.findAllProjectedBy();
    }

    public AddressProjection getAddressByUserId(int id) {
        return addressRepository.findProjectedByUserId(id).orElse(null);
    }
    //get address by id
    public Address getAddressById(int id) {
        return addressRepository.findById(id).orElseThrow(() -> new RuntimeException("Address not found"));
    }

    public String addAddress(NewAddressRequest addressRequest) {
        User user = userRepository.findByEmail(addressRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found by email: " + addressRequest.getEmail()));

        if (addressRepository.existsByUserId(user.getId()))
            return "Address already exists for this user!";
        else {
            Address newAddress = Address.builder()
                    .user(user)
                    .street(addressRequest.getStreet())
                    .city(addressRequest.getCity())
                    .state(addressRequest.getState())
                    .postalCode(addressRequest.getPostalCode())
                    .build();
            addressRepository.save(newAddress);
            return "Address successfully saved";
        }
    }

    public String deleteAddress(String authHeader) {
        String token = jwtService.getTokenFromHeader(authHeader);
        String email = jwtService.extractUsername(token);
        UserInfo user = userRepository.findProjectedByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found by email: " + email));
        Optional<Address> address = addressRepository.findByUserId(user.getId());
        if (address.isPresent()) {
            addressRepository.deleteById(address.get().getId());
            return "Address successfully deleted";
        } else
            return "No address associated with email " + user.getEmail();
    }

    @Transactional
    public String editAddress(EditAddressDTO editAddressDTO) {
        Optional<Address> address = addressRepository.findById(editAddressDTO.getId());

        if (address.isPresent()) {
            Address updatedAddress = address.get();
            updatedAddress.setStreet(editAddressDTO.getStreet());
            updatedAddress.setCity(editAddressDTO.getCity());
            updatedAddress.setState(editAddressDTO.getState());
            updatedAddress.setPostalCode(editAddressDTO.getPostalCode());
            return "Address successfully updated";
        } else
            return "Address could not be updated";
    }
}
