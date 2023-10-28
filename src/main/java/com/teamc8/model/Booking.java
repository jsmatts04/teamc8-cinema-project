package com.teamc8.model;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "total")
    private int total;

    @Column(name = "date")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "show_id", referencedColumnName = "id")
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "payment_card_id", referencedColumnName = "id")
    private PaymentCard paymentCard;

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















