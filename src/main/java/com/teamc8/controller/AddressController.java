package com.teamc8.controller;

import com.teamc8.model.dto.EditAddressDTO;
import com.teamc8.model.projection.AddressProjection;
import com.teamc8.model.request.NewAddressRequest;
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

    @PostMapping(path = "/add")
    public String addAddress(@RequestBody NewAddressRequest addressRequest) {
        return addressService.addAddress(addressRequest);
    }

    @PutMapping(path = "/edit")
    public String editAddress(@RequestBody EditAddressDTO editAddressDTO) {
        return addressService.editAddress(editAddressDTO);
    }

    @DeleteMapping(path = "/delete")
    public String deleteAddress(@RequestHeader("Authorization") String authHeader) {
        return addressService.deleteAddress(authHeader);
    }

}
