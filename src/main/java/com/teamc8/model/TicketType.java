package com.teamc8.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ticket_type")
public class TicketType {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //type
    @Column(name = "type", length = 10)
    private String type;

    //price
    @Column(name = "price")
    private int price;

    public String toString() {
        return "User{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", price='" + price + '\'' +
                '}';
    }




}
