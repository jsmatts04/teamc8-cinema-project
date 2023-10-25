package com.teamc8.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_status")
public class UserStatus {

    public UserStatus(){

    }

    public enum Status {
        ACTIVE,
        INACTIVE,
        SUSPENDED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private Status status;

    public UserStatus(Status status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "UserStatus{" +
                "id=" + id +
                ", status=" + status +
                '}';
    }
}
