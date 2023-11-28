package com.teamc8.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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

    //promotion code
    @Column(name = "code", length = 20)
    private String code;

    //discount amount
    @Column(name = "discount_amount")
    private int discountAmount;

    //start date
    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    private LocalDate startDate;

    //end date
    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    private LocalDate endDate;

    public String getPromotionCode() {
        return code;
    }
}


