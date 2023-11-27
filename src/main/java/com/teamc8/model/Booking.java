package com.teamc8.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "booking")
public class Booking {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //total
    @Column(name = "total")
    private float total;

    //date
    @Column(name = "date")
    private Date date;

    //user_id
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    //show id
    @ManyToOne
    @JoinColumn(name = "show_id", referencedColumnName = "id")
    private Showtime showtime;

    //payment_card_id
    @ManyToOne
    @JoinColumn(name = "payment_card_id", referencedColumnName = "id")
    private PaymentCard paymentCard;

    //promotion_id
    @ManyToOne
    @JoinColumn(name = "promotion_id", referencedColumnName = "id")
    private Promotion promotion;


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", total='" + total + '\'' +
                ", user_id='" + user + '\'' +
                ", payment_card_id='" + paymentCard + '\'' +
                ", promotion_id='" + promotion + '\'' +


                '}';
    }







}















