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
    @Column(name = "card_type")
    private String cardType;

    //expiration date
    @Column(name = "exp_date")
    private Date expirationDate;

    //card number
    @Column(name = "card_number")
    private String cardNumber;

    //name on card
    @Column(name = "name_on_card")
    private String nameOnCard;

    //last 4 digits of card number
    @Column(name = "last_four_digits")
    private String lastFourDigits;

    //address id
    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    public PaymentCard(User user, String cardType, Date expirationDate, String cardNumber, String nameOnCard, Address address, String lastFourDigits) {
        this.user = user;
        this.cardType = cardType;
        this.expirationDate = expirationDate;
        this.cardNumber = cardNumber;
        this.nameOnCard = nameOnCard;
        this.address = address;
        this.lastFourDigits = lastFourDigits;
    }


}
