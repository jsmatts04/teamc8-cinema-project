package com.teamc8.model;
import jakarta.persistence.*;

@Entity
@Table(name = "payment_card")
public class PaymentCard {

    public PaymentCard(){

    }

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getNameOnCard() {
        return nameOnCard;
    }

    public void setNameOnCard(String nameOnCard) {
        this.nameOnCard = nameOnCard;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "PaymentCard{" +
                "id=" + id +
                ", user=" + user +
                ", cardType='" + cardType + '\'' +
                ", expirationDate='" + expirationDate + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                ", nameOnCard='" + nameOnCard + '\'' +
                ", address=" + address +
                '}';
    }
}
