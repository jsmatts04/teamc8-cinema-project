package com.teamc8.service;

import com.teamc8.config.AESEncryptionUtil;
import com.teamc8.model.PaymentCard;
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
        System.out.println("CARD NUMBER: " + paymentCardRequest.getCardNumber() + "\n");
        String encryptedCardNumber = aesEncryptionUtil.encrypt(paymentCardRequest.getCardNumber());
        System.out.println("ENCRYPTED: " + encryptedCardNumber + "\n");
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
    public void deletePaymentCard(int id) {
        paymentCardRepository.deleteById(id);
    }

    //update payment card in user
    public PaymentCard updatePaymentCard(int id, PaymentCard paymentCard) {
        return paymentCardRepository.save(paymentCard);
    }
}
