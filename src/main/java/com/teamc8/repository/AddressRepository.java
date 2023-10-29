package com.teamc8.repository;

import com.teamc8.model.Address;
import com.teamc8.model.projection.AddressProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {

    Optional<Address> findByUserId(int id);
    List<AddressProjection> findAllProjectedBy();
    Optional<AddressProjection> findProjectedByUserId(int id);
    Optional<AddressProjection> findProjectedById(int id);

    boolean existsByUserId(int id);
}
