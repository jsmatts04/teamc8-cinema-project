package com.teamc8.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
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
    private String cardType;

    //expiration date
    private String expirationDate;

    //card number
    private String cardNumber;

    //name on card
    private String nameOnCard;

    //address id
    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    public PaymentCard(User user, String cardType, String expirationDate, String cardNumber, String nameOnCard, Address address) {
        this.user = user;
        this.cardType = cardType;
        this.expirationDate = expirationDate;
        this.cardNumber = cardNumber;
        this.nameOnCard = nameOnCard;
        this.address = address;
    }


}
