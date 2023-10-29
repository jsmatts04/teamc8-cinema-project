package com.teamc8.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //user_id foreign key
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    //street
    @Column(length = 200)
    private String street;
    //city
    @Column(length = 200)
    private String city;
    //state
    @Column(length = 20)
    private String state;

    //postal_code
    @Column(length = 5)
    private String postalCode;

}