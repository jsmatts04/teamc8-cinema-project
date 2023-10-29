package com.teamc8.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "user_type")
public class UserType {

    //id
    @Id
    private short id;

    //type
    @Column(name = "type")
    private String type;

    @Override
    public String toString() {
        return "UserType{" +
                "id=" + id +
                ", type='" + type + '\'' +
                '}';
    }
}
