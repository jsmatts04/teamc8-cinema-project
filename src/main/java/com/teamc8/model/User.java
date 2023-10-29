package com.teamc8.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cinema_user")
public class User implements UserDetails {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    //email
    @Column(name = "email")
    private String email;

    //password
    @Column(name = "password")
    private String password;

    //first_name
    @Column(name = "first_name")
    private String firstName;

    //last_name
    @Column(name = "last_name")
    private String lastName;

    //user_status_id
    @ManyToOne
    @JoinColumn(name = "user_status_id")
    private UserStatus userStatus;

    //user_type_id
    @ManyToOne
    @JoinColumn(name = "user_type_id")
    private UserType userType;

    //phone number
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    //promotion eligibility
    @Column(name = "promo")
    private boolean promotionEligibility;

    public User(String email, String password, String firstName, String lastName, UserStatus userStatus, UserType userType, String phoneNumber, boolean promotionEligibility) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userStatus = userStatus;
        this.userType = userType;
        this.phoneNumber = phoneNumber;
        this.promotionEligibility = promotionEligibility;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userType.getType()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
