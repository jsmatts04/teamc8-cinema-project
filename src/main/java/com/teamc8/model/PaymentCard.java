package com.teamc8.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "payment_card")
public class PaymentCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //user_id foreign key
    @ManyToOne //many to one because of 3 payments cards per customer
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    //type of payment card
    @Column(name = "card_type")
    private String cardType;

    //expiration date
    @Column(name = "exp_date", length = 5)
    private String expirationDate;

    //card number
    @Column(name = "card_number")
    private String cardNumber;

    //name on card
    @Column(name = "name_on_card")
    private String nameOnCard;

    //last 4 digits of card number
    @Column(name = "last_four_digits")
    private String lastFourDigits;

    public PaymentCard(User user, String cardType, String expirationDate, String cardNumber, String nameOnCard, String lastFourDigits) {
        this.user = user;
        this.cardType = cardType;
        this.expirationDate = expirationDate;
        this.cardNumber = cardNumber;
        this.nameOnCard = nameOnCard;
        this.lastFourDigits = lastFourDigits;
    }


}
