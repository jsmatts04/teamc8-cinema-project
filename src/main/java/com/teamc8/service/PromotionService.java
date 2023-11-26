package com.teamc8.service;

import com.teamc8.model.Promotion;
import com.teamc8.repository.PromotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PromotionService {

    private final PromotionRepository promotionRepository;

    public List<Promotion> getAllPromos() {
        return promotionRepository.findAll();
    }

    public Promotion addPromo(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    public Promotion updatePromo(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    public void deletePromo(Promotion promotion) {
        promotionRepository.delete(promotion);
    }

    public Promotion getPromoById(int id) {
        return promotionRepository.findById(id).orElse(null);
    }
}
