package com.teamc8.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_status")
public class UserStatus {

    @Id
    @GeneratedValue
    private short id;
    @Column(name = "status", length = 20)
    private String status;


}
