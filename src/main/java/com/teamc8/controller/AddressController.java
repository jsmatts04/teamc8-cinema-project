package com.teamc8.controller;

import com.teamc8.model.Address;
import com.teamc8.model.projection.AddressProjection;
import com.teamc8.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public List<AddressProjection> getAllAddresses() {
        return addressService.getAllAddresses();
    }

    @GetMapping
    public AddressProjection getAddressByUserId(@RequestParam int userId) {
        return addressService.getAddressByUserId(userId);
    }

}
