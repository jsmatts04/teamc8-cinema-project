package com.teamc8.model;
import jakarta.persistence.*;

@Entity
@Table(name = "address")
public class Address {

    public Address(){

    }

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", street='" + street + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", postalCode='" + postalCode + '\'' +
                '}';
    }
}