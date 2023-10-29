package com.teamc8.service;

import com.teamc8.config.JwtService;
import com.teamc8.model.dto.AllUserInfoDTO;
import com.teamc8.model.projection.AddressProjection;
import com.teamc8.model.projection.PaymentCardProjection;
import com.teamc8.model.projection.UserInfo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GeneralService {

    private final UserService userService;
    private final PaymentCardService paymentCardService;
    private final AddressService addressService;
    private final JwtService jwtService;

    // Returns all user info by user email
    // Includes user info, payment cards, and address
    public AllUserInfoDTO getAllUserInfoByEmail(String email) {
        UserInfo user = userService.getUserInfoByEmail(email);
        List<PaymentCardProjection> paymentCards = paymentCardService.getAllPaymentCardsForUser(user.getId());
        AddressProjection address = addressService.getAddressByUserId(user.getId());

        return AllUserInfoDTO.builder()
                .user(user)
                .paymentCards(paymentCards)
                .address(address)
                .build();
    }

    public UserInfo getUserInfoFromHeader(String authHeader) {
        String token = jwtService.getTokenFromHeader(authHeader);
        String email = jwtService.extractUsername(token);
        return userService.getUserInfoByEmail(email);
    }

}
