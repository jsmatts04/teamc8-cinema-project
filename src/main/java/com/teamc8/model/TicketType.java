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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "type")
    private char type;

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
