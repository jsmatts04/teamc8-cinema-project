package com.teamc8.controller;

import com.teamc8.model.PaymentCard;
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

    //add payment card to user
    @PostMapping("/add")
    public PaymentCard addPaymentCard(@RequestBody NewPaymentCardRequest paymentCard) {
        return paymentCardService.addPaymentCard(paymentCard);
    }

    //delete payment card from user
    @DeleteMapping("/delete/{id}")
    public void deletePaymentCard(@PathVariable int id) {
        paymentCardService.deletePaymentCard(id);
    }

    //update payment card in user
    @PutMapping("/update/{id}")
    public PaymentCard updatePaymentCard(@PathVariable int id, PaymentCard paymentCard) {
        return paymentCardService.updatePaymentCard(id, paymentCard);
    }

}
