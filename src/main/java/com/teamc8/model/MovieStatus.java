package com.teamc8.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movie_status")
public class MovieStatus {

    @Id
    private short id;

    @Column(name = "status")
    private String statusType;

    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    public String getStatusType() {
        return statusType;
    }

    public void setStatusType(String statusType) {
        this.statusType = statusType;
    }

    @Override
    public String toString() {
        return "MovieStatus{" +
                "id=" + id +
                ", statusType='" + statusType + '\'' +
                '}';
    }
}
