package com.teamc8.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_type")
public class UserType {

    @Id
    private short id;

    @Column(name = "type")
    private String type;

    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "UserType{" +
                "id=" + id +
                ", type='" + type + '\'' +
                '}';
    }
}
