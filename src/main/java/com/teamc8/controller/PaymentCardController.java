package com.teamc8.controller;

import com.teamc8.model.PaymentCard;
import com.teamc8.model.projection.PaymentCardProjection;
import com.teamc8.model.request.EditPaymentCardRequest;
import com.teamc8.model.request.NewPaymentCardRequest;
import com.teamc8.service.PaymentCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment-card")
@RequiredArgsConstructor
public class PaymentCardController {

    private final PaymentCardService paymentCardService;

    //get all payment cards from user
    @GetMapping
    public List<PaymentCard> getAllPaymentCards() {
        return paymentCardService.getAllPaymentCards();
    }

    //get payment card by id
    @GetMapping("/{id}")
    public PaymentCard getPaymentCardById(@PathVariable int id) {
        return paymentCardService.getPaymentCardById(id);
    }

    @GetMapping(path = "/user")
    public List<PaymentCardProjection> getAllPaymentCardsForUser(@RequestParam String email) {
        return paymentCardService.getAllPaymentCardsForUserByEmail(email);
    }

    //add payment card to user
    @PostMapping("/add")
    public PaymentCard addPaymentCard(@RequestBody NewPaymentCardRequest paymentCard) {
        return paymentCardService.addPaymentCard(paymentCard);
    }

    //delete payment card from user
    @DeleteMapping("/delete/{id}")
    public void deletePaymentCard(@PathVariable int id, @RequestHeader("Authorization") String authHeader) {
        paymentCardService.deletePaymentCard(id, authHeader);
    }

    //update payment card in user
    @PutMapping("/update")
    public PaymentCard updatePaymentCard(@RequestBody EditPaymentCardRequest paymentCardRequest) {
        return paymentCardService.updatePaymentCard(paymentCardRequest);
    }

}
