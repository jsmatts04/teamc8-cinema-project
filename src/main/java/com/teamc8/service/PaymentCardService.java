package com.teamc8.service;

import com.teamc8.config.AESEncryptionUtil;
import com.teamc8.config.JwtService;
import com.teamc8.exception.PaymentCardNotFoundException;
import com.teamc8.model.PaymentCard;
import com.teamc8.model.projection.PaymentCardProjection;
import com.teamc8.model.projection.UserInfo;
import com.teamc8.model.request.NewPaymentCardRequest;
import com.teamc8.repository.PaymentCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentCardService {

    private final PaymentCardRepository paymentCardRepository;
    private final AESEncryptionUtil aesEncryptionUtil;
    private final UserService userService;
    private final AddressService addressService;
    private final JwtService jwtService;

    //get all payment cards from user
    public List<PaymentCard> getAllPaymentCards() {
        return paymentCardRepository.findAll();
    }

    //get payment card by id
    public PaymentCard getPaymentCardById(int id) {
        return paymentCardRepository.findById(id).orElse(null);
    }

    //add payment card to user
    public PaymentCard addPaymentCard(NewPaymentCardRequest paymentCardRequest) {
        String lastFourDigits = paymentCardRequest.getCardNumber().substring(paymentCardRequest.getCardNumber().length() - 4);
        String encryptedCardNumber = aesEncryptionUtil.encrypt(paymentCardRequest.getCardNumber());
        PaymentCard newCard = PaymentCard.builder()
                .cardNumber(encryptedCardNumber)
                .lastFourDigits(lastFourDigits)
                .user(userService.getUserByEmail(paymentCardRequest.getEmail()))
                .expirationDate(paymentCardRequest.getExpirationDate())
                .cardType(paymentCardRequest.getCardType())
                .nameOnCard(paymentCardRequest.getNameOnCard())
                .address(addressService.getAddressById(paymentCardRequest.getAddressId()))
                .build();
        return paymentCardRepository.save(newCard);
    }

    //delete payment card from user
    public void deletePaymentCard(int id, String authHeader) {
        String token = jwtService.getTokenFromHeader(authHeader);
        String email = jwtService.extractUsername(token);
        PaymentCard card = paymentCardRepository.findById(id)
                .orElseThrow(() -> new PaymentCardNotFoundException("Payment card not found by id: " + id));

        if (card.getUser().getEmail().equals(email))
            paymentCardRepository.deleteById(id);
        else
            throw new RuntimeException("Not authorized to delete payment card by id: " + id);
    }

    //update payment card in user
    public PaymentCard updatePaymentCard(int id, PaymentCard paymentCard) {
        return paymentCardRepository.save(paymentCard);
    }

    public List<PaymentCardProjection> getAllPaymentCardsForUserByEmail(String email) {
        UserInfo user = userService.getUserInfoByEmail(email);
        return getAllPaymentCardsForUser(user.getId());
    }

    public List<PaymentCardProjection> getAllPaymentCardsForUser(int userId) {
        return paymentCardRepository.findAllProjectedByUserId(userId)
                .orElse(null);
    }
}
