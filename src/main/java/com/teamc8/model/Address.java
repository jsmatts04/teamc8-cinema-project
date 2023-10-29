package com.teamc8.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
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

    public Address(User user, String street, String city, String state, String postalCode) {
        this.user = user;
        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }

}