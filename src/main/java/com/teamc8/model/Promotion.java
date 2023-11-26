package com.teamc8.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "promotion")
public class Promotion {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //booking
    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "promotion_id")
    private Booking booking;

    //discount amount
    @Column(name = "discount_amount")
    private int discountAmount;

    //start date
    @Column(name = "start_date")
    private Date startDate;

    //end date
    @Column(name = "end_date")
    private Date endDate;

}


