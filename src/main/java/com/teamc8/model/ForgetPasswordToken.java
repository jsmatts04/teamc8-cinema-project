package com.teamc8.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "forget_password_token")
public class ForgetPasswordToken {
    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //token
    @Column(nullable = false)
    private String token;

    //time created at
    @Column(nullable = false)
    private LocalDateTime timeCreatedAt;

    //time expired at
    @Column(nullable = false)
    private LocalDateTime timeExpiredAt;

    //time confirmed at
    private LocalDateTime timeConfirmedAt;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    //user
    private User user;
}
