package com.teamc8.repository;

import com.teamc8.model.PaymentCard;
import com.teamc8.model.projection.PaymentCardProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentCardRepository extends JpaRepository<PaymentCard, Integer> {

    Optional<List<PaymentCard>> findAllByUserId(int id);
    Optional<List<PaymentCardProjection>> findAllProjectedByUserId(int id);

}
