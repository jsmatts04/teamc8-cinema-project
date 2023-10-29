package com.teamc8.controller;

import com.teamc8.model.Address;
import com.teamc8.model.projection.AddressProjection;
import com.teamc8.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(path = "/{id}")
    public AddressProjection getAddressByUserId(@PathVariable("id") int userId) {
        return addressService.getAddressByUserId(userId);
    }

}
